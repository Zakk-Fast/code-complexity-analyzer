from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import Code_Block, AnalysisResult, Language
from analyzer import analyze_code
 
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://code-complexity-analyzer-indol.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dummy_code = """
import React, { useState, useEffect } from 'react';

const NavigationMenu = ({ items, currentUser, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchUserPermissions(currentUser.id);
    }
  }, [currentUser]);

  const fetchUserPermissions = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}/permissions`);
      const permissions = await response.json();
      setUserPermissions(permissions);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
      setUserPermissions([]);
    }
  };

  const handleItemClick = (item) => {
    if (canAccessItem(item)) {
      setActiveItem(item.id);
      if (onItemClick) {
        onItemClick(item);
      }
    } else {
      alert('You do not have permission to access this item');
    }
  };

  const canAccessItem = (item) => {
    if (!item.requiresPermission) return true;
    return userPermissions.some(permission => 
      permission.resource === item.resource && permission.action === 'read'
    );
  };

  const filteredItems = items.filter(item => {
    if (currentUser?.role === 'admin') return true;
    if (item.adminOnly) return false;
    return canAccessItem(item);
  });

  return (
    <nav className={`navigation ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      
      {isOpen && (
        <ul className="nav-list">
          {filteredItems.map((item, index) => {
            const isActive = activeItem === item.id;
            const hasSubItems = item.children && item.children.length > 0;
            
            return (
              <li key={item.id || index} className={`nav-item ${isActive ? 'active' : ''}`}>
                <a 
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                  className={`nav-link ${item.disabled ? 'disabled' : ''}`}
                >
                  {item.icon && <span className="nav-icon">{item.icon}</span>}
                  {item.label}
                  {hasSubItems && <span className="arrow">▼</span>}
                </a>
                
                {hasSubItems && isActive && (
                  <ul className="sub-nav">
                    {item.children.map(child => (
                      <li key={child.id}>
                        <a href={child.url} onClick={(e) => {
                          e.preventDefault();
                          handleItemClick(child);
                        }}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default NavigationMenu;
"""


@app.get("/")
async def root():
    return {"message": "Hello world"}

@app.post('/analyze', response_model=AnalysisResult)
async def analyze_code_endpoint(code_block: Code_Block) -> AnalysisResult:
    return analyze_code(code_block)


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=port)
