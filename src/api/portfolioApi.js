import apiClient from "./axiosClient";
// Adjust these paths to match your actual Spring Boot controller mappings.
export const saveBasicInfo = (data) => apiClient.post("/api/developer/portfolio/save", data).then((r) => r.data);
export const saveEducation = (data) => apiClient.post("/api/developer/educations/addeducation", data).then((r) => r.data);
export const saveSkills = (data) => apiClient.post("/api/adddeveloper/skill/skills/save", data).then((r) => r.data);
export const saveExperience = (data) => apiClient.post("/api/developer/experience/add/experiences", data).then((r) => r.data);
export const saveProjects = (data) => apiClient.post("/api/developer/projects/addproject", data).then((r) => r.data);
export const saveCertifications = (data) => apiClient.post("/api/developer/certifocations/add/certifications", data).then((r) => r.data);
export const saveSocialMedia = (socialMedia) => {
  return apiClient.post("/api/developer/socialmedia/add/socialmedia", socialMedia);
};
// Matches the /api/developer/portfolio/generate endpoint you already built.
export const generatePortfolio = () => apiClient.get("/api/auth/see").then((r) => r.data);


