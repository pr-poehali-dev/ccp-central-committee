const API_URLS = {
  auth: 'https://functions.poehali.dev/0e28e744-b936-49bb-8c36-4227286d304b',
  admin: 'https://functions.poehali.dev/fd0c84b9-19e1-45a0-9a70-07671be108b1',
  roles: 'https://functions.poehali.dev/087f9201-a32d-42f7-a2b3-4173d3035942'
};

export const api = {
  async login(username: string, password: string) {
    const response = await fetch(API_URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', username, password })
    });
    return response.json();
  },

  async createAdmin(username: string, password: string) {
    const response = await fetch(API_URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create_admin', username, password })
    });
    return response.json();
  },

  async getSettings() {
    const response = await fetch(`${API_URLS.admin}?entity=settings`);
    return response.json();
  },

  async updateSettings(settings: Record<string, string>) {
    const response = await fetch(`${API_URLS.admin}?entity=settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return response.json();
  },

  async getNews() {
    const response = await fetch(`${API_URLS.admin}?entity=news`);
    return response.json();
  },

  async addNews(news: { title: string; content: string; category: string; date?: string }) {
    const response = await fetch(`${API_URLS.admin}?entity=news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(news)
    });
    return response.json();
  },

  async deleteNews(id: number) {
    const response = await fetch(`${API_URLS.admin}?entity=news`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return response.json();
  },

  async getOfficials() {
    const response = await fetch(`${API_URLS.admin}?entity=officials`);
    return response.json();
  },

  async addOfficial(official: { name: string; role: string; description?: string; icon?: string; category: string; sort_order?: number }) {
    const response = await fetch(`${API_URLS.admin}?entity=officials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(official)
    });
    return response.json();
  },

  async updateOfficial(official: { id: number; name: string; role: string; description?: string; category: string }) {
    const response = await fetch(`${API_URLS.admin}?entity=officials`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(official)
    });
    return response.json();
  },

  async deleteOfficial(id: number) {
    const response = await fetch(`${API_URLS.admin}?entity=officials`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return response.json();
  },

  async getConstructionProjects() {
    const response = await fetch(`${API_URLS.admin}?entity=construction_projects`);
    return response.json();
  },

  async updateConstructionProject(project: { id: number; name: string; progress: number; status: string; description?: string; lead?: string }) {
    const response = await fetch(`${API_URLS.admin}?entity=construction_projects`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    return response.json();
  },

  async addConstructionProject(project: { name: string; progress: number; status: string; description?: string; lead?: string }) {
    const response = await fetch(`${API_URLS.admin}?entity=construction_projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    return response.json();
  },

  async deleteConstructionProject(id: number) {
    const response = await fetch(`${API_URLS.admin}?entity=construction_projects`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return response.json();
  },

  async getLubertsyConstruction() {
    const response = await fetch(`${API_URLS.admin}?entity=lubertsy_construction`);
    return response.json();
  },

  async updateLubertsyConstruction(item: { id: number; name: string; status: string; is_completed: boolean }) {
    const response = await fetch(`${API_URLS.admin}?entity=lubertsy_construction`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return response.json();
  },

  async addLubertsyConstruction(item: { name: string; status: string; is_completed: boolean }) {
    const response = await fetch(`${API_URLS.admin}?entity=lubertsy_construction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return response.json();
  },

  async deleteLubertsyConstruction(id: number) {
    const response = await fetch(`${API_URLS.admin}?entity=lubertsy_construction`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.dumps({ id })
    });
    return response.json();
  },

  async getLubertsyNews() {
    const response = await fetch(`${API_URLS.admin}?entity=lubertsy_news`);
    return response.json();
  },

  async addLubertsyNews(news: { content: string; date?: string }) {
    const response = await fetch(`${API_URLS.admin}?entity=lubertsy_news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(news)
    });
    return response.json();
  },

  async deleteLubertsyNews(id: number) {
    const response = await fetch(`${API_URLS.admin}?entity=lubertsy_news`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return response.json();
  },

  async getRoleRequests() {
    const response = await fetch(`${API_URLS.admin}?entity=role_requests`);
    return response.json();
  },

  async updateRoleRequestStatus(id: number, status: string) {
    const response = await fetch(`${API_URLS.admin}?entity=role_requests`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    return response.json();
  },

  async submitRoleRequest(data: { name: string; role: string; reason: string }) {
    const response = await fetch(API_URLS.roles, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async getArmyNews() {
    const response = await fetch(`${API_URLS.admin}?entity=army_news`);
    return response.json();
  },

  async addArmyNews(news: { title: string; content: string; date?: string }) {
    const response = await fetch(`${API_URLS.admin}?entity=army_news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(news)
    });
    return response.json();
  },

  async deleteArmyNews(id: number) {
    const response = await fetch(`${API_URLS.admin}?entity=army_news`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return response.json();
  }
};
