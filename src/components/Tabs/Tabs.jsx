// Tabs.jsx
import React, { useState, useEffect } from 'react';

export const Tabs = ({ tabs, activeTabId, onTabSelected }) => {
  const initialActive = tabs.find(tab => tab.id === activeTabId)?.id || tabs[0].id;
  const [activeTab, setActiveTab] = useState(initialActive);

  useEffect(() => {
    const validTab = tabs.find(tab => tab.id === activeTabId)?.id;
    if (validTab && validTab !== activeTab) setActiveTab(validTab);
  }, [activeTabId, tabs]);

  const handleClick = (tabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    if (onTabSelected) onTabSelected(tabId);
  };

  const selectedTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div data-cy="TabsComponent">
      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.id}
              className={tab.id === activeTab ? 'is-active' : ''}
              data-cy="Tab"
            >
              <a
                href={`#${tab.id}`}
                data-cy="TabLink"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(tab.id);
                }}
              >
                {tab.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="block" data-cy="TabContent">
        {selectedTab?.content}
      </div>
    </div>
  );
};
