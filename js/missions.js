const missions = {
  data: [],
};

missions.init = async function () {
  //Get dom elements  recupere les elements dans les templates
  missions.tableContent = document.querySelector("#container-list table tbody");

  //console.log(missions.tableContent,"missions.tableContent")

  missions.data = await missions.getAll().catch(() => {
    alert("Impossible de récupérer les missions");
    return [];
  });

  missions.renderTable();
};

missions.renderTable = () => {
  let content = "";
  missions.data.forEach((e, index) => {
    content += `
    <tr>
      <td>${e.id}</td>
      <td>${e.name}</td>    
      <td>${e.ste}</td>
      <td>${e.Sdate}</td>
      <td>${e.Edate}</td>
      <td>${e.inter}</td>
      
      <td>
        <button class="btn btn-primary"onclick = "missions.edit(${index})">Modifier</button>
        <button class="btn btn-danger"onclick = "missions.remove(${index})">Supprimer</button>
      </td>
      </tr> 
    `;
  });

  missions.tableContent.innerHTML = content;
};

missions.toggleForm = () => {
  $("#missions-form form input").val("");
  $("#container-list").toggle();
};
//sauvegarde sans rechargement de page
missions.save = async (event) => {
  event.preventDefault();
  const id = $('input[name="id"]').val();
  const name = $('input[name="name"]').val();
  const ste = $('input[name="ste"]').val();
  const Sdate = $('input[name="Sdate"]').val();
  const Edate = $('input[name="Edate"]').val();
  const inter = $('input[name="inter"]').val();
  console.log("id", id);
  console.log("name", name);
  console.log("ste", ste);
  console.log("Sdate", Sdate);
  console.log("Edate", Edate);
  console.log("inter", inter);

  const record = missions.data.find((d) => d.id === id);

  //Edit
  if (record) {
    record.id = id;
    record.name = name;
    record.ste = ste;
    record.Sdate = Sdate;
    record.Edate = Edate;
    record.inter = inter;
  }
  //Ajout d 'un Id  incrementer de 1 par rapport au dernier id du tableau
  else {
    const missionsSaved = await $.ajax({
      type: "POST",
      url: `${app.api}/missions/`,
      data: { id, name, ste, Sdate, Edate, inter },
    });
    missions.data.push(missionsSaved);
  }
  missions.renderTable();
  missions.toggleForm();
};
missions.edit = (index) => {
  //masque le tableau et affiche le formulaire
  missions.toggleForm();
  //Si c est une edition on remplit le formulaire sinon on ne le remplit pas
  if (index != undefined) {
    missions.fillForm(index);
  }
};
//fonction qui permet de completer le form
missions.fillForm = (index) => {
  //recupere l element dans le tab js
  const record = missions.data[index];

  //si le tableau est nul je peux alimenté mon tableau html
  if (record != null) {
    $('input[name="id"]').val(record.id);
    $('input[name="name"]').val(record.name);
    $('input[name="ste"]').val(record.ste);
    $('input[name="Sdate"]').val(record.Sdate);
    $('input[name="Edate"]').val(record.Edate);
    $('input[name="inter"]').val(record.inter);
  }
};

// supprimer une missions
missions.remove = async (index) => {
  const record = missions.data[index];
  if (
    record != null &&
    confirm(`souhaitez vous supprimer cette mission?: ${record.name}`)
  ) {
    try {
      await $.ajax({
        type: "DELETE",
        url: `${app.api}/missions/${record.id}`,
      });

      missions.data.splice(index, 1);
      missions.renderTable();
    } catch (e) {
      alert("impossible de supprimer cette mission");
    }
  }
};

// recuperer
missions.getAll = () => {
  return $.ajax({
    type: "GET",
    url: `${app.api}/missions`,
  });
};

app.controllers.missions = missions;
