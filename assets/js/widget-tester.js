/**
 * Neogram Widget Tester Logic
 * Allows interactive testing of Neogram widgets (iframe galleries, chat pagers, profile cards)
 */

document.addEventListener('DOMContentLoaded', () => {
  const previewBox = document.getElementById('widget-preview-target');
  const embedCodeInput = document.getElementById('widget-embed-code');
  const widgetSelectBtns = document.querySelectorAll('.widget-select-btn');
  const btnApplyCustom = document.getElementById('btn-apply-custom');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const btnResetWidget = document.getElementById('btn-reset-widget');
  const statusMsg = document.getElementById('widget-status-msg');

  if (!previewBox) return;

  function renderWidget(code) {
    if (!previewBox) return;
    previewBox.innerHTML = code;

    // If widget includes scripts, execute them by re-creating script elements
    const scripts = previewBox.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    if (statusMsg) {
      statusMsg.textContent = '🟢 Widget rendered in preview frame';
      setTimeout(() => {
        statusMsg.textContent = 'Ready';
      }, 3000);
    }
  }

  // Handle preset selection
  widgetSelectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      widgetSelectBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const rawCode = btn.getAttribute('data-embed-code') || '';
      if (embedCodeInput) {
        embedCodeInput.value = rawCode;
      }
      renderWidget(rawCode);
    });
  });

  // Apply custom code from textarea
  if (btnApplyCustom && embedCodeInput) {
    btnApplyCustom.addEventListener('click', () => {
      renderWidget(embedCodeInput.value);
    });
  }

  // Copy code to clipboard
  if (btnCopyCode && embedCodeInput) {
    btnCopyCode.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(embedCodeInput.value);
        if (statusMsg) {
          statusMsg.textContent = '📋 Embed code copied to clipboard!';
          setTimeout(() => {
            statusMsg.textContent = 'Ready';
          }, 3000);
        }
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  }

  // Reset to default
  if (btnResetWidget) {
    btnResetWidget.addEventListener('click', () => {
      if (widgetSelectBtns.length > 0) {
        widgetSelectBtns[0].click();
      }
    });
  }

  // Initial load
  if (widgetSelectBtns.length > 0) {
    widgetSelectBtns[0].click();
  }
});
