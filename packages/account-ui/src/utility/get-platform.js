export const getPlatform = () => {
  if (navigator.userAgentData !== undefined && navigator.userAgentData != null) {
    const userAgentPlatform = navigator.userAgentData.platform.toLowerCase();

    const OSX = /mac/.test(userAgentPlatform);
    const IOS = ['iphone', 'ipad', 'ipod'].includes(userAgentPlatform);
    const APPLE = OSX || IOS;
    const WINDOWS = /win/.test(userAgentPlatform);
    const ANDROID = /android/.test(userAgentPlatform);
    const LINUX = /linux/.test(userAgentPlatform);

    return {
      OSX,
      IOS,
      APPLE,
      WINDOWS,
      ANDROID,
      LINUX,
    };
  }

  return 'unknown';
};

export const platform = getPlatform();
