const BASE_URL = "https://dataguard-server-56lu.vercel.app";

export const getTabs = async (): Promise<any[]> => {
  const response = await fetch(`${BASE_URL}/tabs`);
  const tabs = await response.json();
  return tabs;
};

export const getPlugins = async (): Promise<any[]> => {
  const response = await fetch(`${BASE_URL}/plugins`);
  const plugins = await response.json();
  return plugins;
};

export const getTabData = async (tabId: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/tabs/${tabId}`);
  const tabData = await response.json();
  return tabData;
};

export const updateTabData = async (
  tabId: string,
  updatedData: any
): Promise<any> => {
  const response = await fetch(`${BASE_URL}/tabs/${tabId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  const updatedTabData = await response.json();
  return updatedTabData;
};
