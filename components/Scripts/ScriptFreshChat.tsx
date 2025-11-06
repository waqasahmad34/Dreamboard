import Script from 'next/script';

// TypeScript declarations for FreshChat and analytics
declare global {
  interface Window {
    fcSettings?: {
      token: string;
      host: string;
      onInit: () => void;
    };
    fcWidget?: {
      on: (event: string, callback: (resp?: any) => void) => void;
      open: () => void;
      close: () => void;
    };
    dataLayer?: Array<{ event: string }>;
    ga?: (command: string, ...args: any[]) => void;
  }
}

const ScriptFreshChat = () => {
  return (
    <>
      <Script
        id="freshchat-settings"
        strategy="beforeInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: update later with react module
        dangerouslySetInnerHTML={{
          __html: `
						window.fcSettings = {
							token: "551b2a9f-7d82-4208-bcdf-058bea0306d8",
							host: "https://wchat.freshchat.com",
							onInit: function() {
								if (typeof(window.ga) === "function") {
									//ga('create', 'UA-122816029-1', 'auto', 'FreshchatEvents');
									if (window.fcWidget) {
										window.fcWidget.on("widget:loaded", function(resp) {
											if (window.fcWidget) {
												window.fcWidget.on("widget:opened", function(resp) {
													//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-open');
													if (window.dataLayer) {
														window.dataLayer.push({ event : 'fx-chat-open'});
													}
													//window.uetq = window.uetq || [];
													//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-open', 'el':'chatWidget'});
												});
												window.fcWidget.on("widget:closed", function(resp) {
													//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-close');
													if (window.dataLayer) {
														window.dataLayer.push({ event : 'fx-chat-close'});
													}
													//window.uetq = window.uetq || [];
													//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-close', 'el':'chatWidget'});
												});
												window.fcWidget.on('message:received', function(resp) {
													//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-received');
													if (window.dataLayer) {
														window.dataLayer.push({ event : 'fx-chat-received'});
													}
													//window.uetq = window.uetq || [];
													//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-received', 'el':'chatWidget'});
												});
												window.fcWidget.on('message:sent', function(resp) {
													//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-sent');
													if (window.dataLayer) {
														window.dataLayer.push({ event : 'fx-chat-sent'});
													}
													//window.uetq = window.uetq || [];
													//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-sent', 'el':'chatWidget'});
												});
												window.fcWidget.on('user:statechange', function(resp) {
													if (resp && resp.data && resp.data.userState === "created") {
														//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-create');
														if (window.dataLayer) {
															window.dataLayer.push({ event : 'fx-chat-create'});
														}
														//window.uetq = window.uetq || [];
														//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-create', 'el':'chatWidget'});
													}
													if (resp && resp.data && resp.data.userState === "loaded") {
														//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-loaded');
														if (window.dataLayer) {
															window.dataLayer.push({ event : 'fx-chat-loaded'});
														}
														//window.uetq = window.uetq || [];
														//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-loaded', 'el':'chatWidget'});
													}
													if (resp && resp.data && resp.data.userState === "identified") {
														//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-identified');
														if (window.dataLayer) {
															window.dataLayer.push({ event : 'fx-chat-identified'});
														}
														//window.uetq = window.uetq || [];
														//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-identified', 'el':'chatWidget'});
													}
													if (resp && resp.data && resp.data.userState === "restored") {
														//ga('FreshchatEvents.send', 'event', 'Freshchat', 'chat-restored');
														if (window.dataLayer) {
															window.dataLayer.push({ event : 'fx-chat-restored'});
														}
														//window.uetq = window.uetq || [];
														//window.uetq.push({ 'ec':'Freshchat', 'ea':'chat-restored', 'el':'chatWidget'});
													}
												});
											}
										});
									}
								}
								else {
									console.log('Google Analytics not loaded');
								}
							}
						};
					`,
        }}
      />
      <Script
        src="https://wchat.freshchat.com/js/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
};

// Utility functions to control the chat widget
export const openFreshChat = () => {
  if (typeof window !== 'undefined' && window.fcWidget) {
    window.fcWidget.open();
  }
};

export const closeFreshChat = () => {
  if (typeof window !== 'undefined' && window.fcWidget) {
    window.fcWidget.close();
  }
};

export default ScriptFreshChat;
