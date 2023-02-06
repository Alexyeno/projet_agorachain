import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/agora");
  }

  get(id) {
    return http.get(`/agora/${id}`);
  }

  create(data) {
    return http.post("/agora", data);
  }

  update(id, data) {
    return http.put(`/agora/${id}`, data);
  }

  delete(id) {
    return http.delete(`/agora/${id}`);
  }

  deleteAll() {
    return http.delete(`/agora`);
  }

  findByTitle(title) {
    return http.get(`/agora?title=${title}`);
  }
}

export default new DataService();