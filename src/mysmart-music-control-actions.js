function fireEvent(node, type, detail = {}) {
  const event = new Event(type, {
    bubbles: true,
    cancelable: false,
    composed: true,
  });
  event.detail = detail;
  node.dispatchEvent(event);
}

export async function performCardAction(node, hass, actionConfig, context = {}) {
  const action = actionConfig?.action || 'none';

  if (action === 'none') {
    return;
  }

  if (action === 'more-info') {
    if (context.entityId) {
      fireEvent(node, 'hass-more-info', { entityId: context.entityId });
    }
    return;
  }

  if (action === 'navigate') {
    const path = actionConfig.navigation_path;
    if (path) {
      history.pushState(null, '', path);
      fireEvent(window, 'location-changed', { replace: false });
    }
    return;
  }

  if (action === 'url') {
    const url = actionConfig.url_path;
    if (url) {
      const target = actionConfig.new_tab === true ? '_blank' : '_self';
      window.open(url, target);
    }
    return;
  }

  if (action === 'call-service' || action === 'perform-action') {
    const service = actionConfig.service || actionConfig.perform_action;
    if (!service || typeof service !== 'string') {
      return;
    }

    const [domain, serviceName] = service.split('.');
    if (!domain || !serviceName) {
      return;
    }

    await hass.callService(domain, serviceName, {
      ...(actionConfig.service_data || actionConfig.data || {}),
      ...(context.entityId ? { entity_id: context.entityId } : {}),
    });
    return;
  }

  if (action === 'toggle' && context.entityId) {
    await hass.callService('homeassistant', 'toggle', { entity_id: context.entityId });
  }
}
