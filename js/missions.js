const missions = {
  data: [],
};

missions.init = function () {
  //Get dom elements  recupere les elements dans les templates
  missions.tableContent = document.querySelector("#container-list table tbody");

  missions.data = missions.getAll();
  missions.renderTable();
};

missions.renderTable = () => {
  let content = "";
  missions.data.forEach((e, index) => {
    content += `
    <tr>
      <td>${e.id}</td>
      <td>${e.name}</td>      
    </tr> 
    `;
  });
  missions.tableContent.innerHTML = content;
};

missions.getAll = () => {
  // MOCK;
  return [
    {
      id: 1,
      name: "mission 1",
    },
    {
      id: 2,
      name: "mission 2",
    },
  ];
};
app.controllers.missions = missions;
