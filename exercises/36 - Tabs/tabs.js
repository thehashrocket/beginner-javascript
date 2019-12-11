console.log('ya ya wes we get it.. IT WORKS!');

const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
// Method 1
// const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

// Method 2 - find in the array of tabPanels
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
  // hide all tab panels
  tabPanels.forEach(panel => {
    panel.hidden = true;
  });
  // mark all tabs as unselected
  tabButtons.forEach(tab => {
    tab.setAttribute('aria-selected', false);
  });
  // mark this tab as selected
  event.currentTarget.setAttribute('aria-selected', true);
  // find the associated tabPanel and show it.
  const { id } = event.currentTarget;

  // Method 1
  //   const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  //   tabPanel.hidden = false;

  // Method 2 - find in the array of tabPanels
  const tabPanel = tabPanels.find(
    panel => panel.getAttribute('aria-labelledby') === id
  );
  tabPanel.hidden = false;
}
tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
