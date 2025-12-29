;(function () {
  try {
    Object.defineProperty(window, 'top', {
      get: () => window,
      configurable: false,
    })
  } catch {}

  try {
    Object.defineProperty(window, 'parent', {
      get: () => window,
      configurable: false,
    })
  } catch {}

  try {
    Object.defineProperty(window, 'frameElement', {
      get: () => null,
      configurable: false,
    })
  } catch {}

  try {
    delete (window as unknown as Record<string, unknown>).process
    delete (window as unknown as Record<string, unknown>).require
  } catch {}

  try {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
      configurable: true,
    })
  } catch {}
})()
