import firebaseKeys from './helpers/apiKeys.js';

const firebaseUrl = firebaseKeys.databaseURL;


const getMyProjects = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/projects.json`)
    .then((results) => {
      const projectResults = results.data;
      console.log(projectResults);
      const projects = [];
      Object.keys(projectResults).forEach((projectId) => {
        projectResults[projectId].id = projectId;
        projects.push(projectResults[projectId]);
      });
      resolve(projects);
    })
    .catch(err => reject(err));
});


const MyProjectStringBuilder = () => {
  getMyProjects().then((projectResp) => {
      let domString = '<div class="row d-flex justify content-space-around">';
      projectResp.forEach((project) => {
        domString += '<div class= "card col-sm-6 col-md-4 col-lg-4 col-xl-4 work-thumb owl-carousel nonloop-block-13" data-fancybox="gallery">';
        domString += `<a class="" href="${project.imageUrl}">`;
        domString += '<div class="work-text">';
        domString += `<h3>${project.title}</h3>`;
        domString += `<h5>${project.summary}</h5>`;
        domString += `<span class="category">Live link to firebase<a href="${project.firebaseUrl}"> <h4>HERE<h4></a></span><br/>`;
        domString += `<span class="category">Find the Source code on Github<a href="${project.githubUrl}"> <h4>HERE<h4></a></span><br/>`;
        domString += '</div>';
        domString += `<img src="${project.imageUrl}" alt="Image" class="img-fluid">`;
        domString += `</a>`;
        domString += '</div>';
      });
      domString += '</div>';
      const selectedDiv = document.getElementById('projects');
      selectedDiv.innerHTML = domString;
    }).catch(err => console.error('could not get projects', err));
  };
  MyProjectStringBuilder();