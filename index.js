const path = "csvs/experience.csv";

const link = 4;
const desc_index = 5;

fetch(path)
  .then((res) => res.text())
  .then((text) => {

    const rows = text.split("\n").map(row => row.trim());
    const data = rows.slice(1).map((row) => {
      let items = row.split(",");
      let temp = items.slice(desc_index); 
      let desc = temp.join(","); 
      return items.slice(0, desc_index).concat(desc); 
    });

    const experience = document.getElementById("experience");

    const pc = document.createElement("div")

    data.forEach((row, i) => {
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.gap="5px"
      container.style.marginLeft="10px"

      const pos_container = document.createElement("div");
      pos_container.style.display = "flex";
      pos_container.style.flexDirection="column";

      const dates = document.createElement("div");
      const position = document.createElement("b");
      const location = document.createElement("div");

      dates.id = "dates_" + i;
      dates.style.width="200px";
      dates.style.color="rgb(136, 183, 181)"
      dates.textContent = row[0];
      container.appendChild(dates);
        
      location.textContent = row[1];
      position.textContent = row[3] + " | " + row[2]; 
      position.style.color="rgb(84, 140, 137)";
      position.style.fontSize="18px";
    
      //description
      let trim_desc = row[desc_index].substring(1, row[desc_index].length -1);
      const ul = document.createElement("ul");
      ul.style.width = "700px";
        trim_desc.split(".").map(jd => {
        const li = document.createElement("li");
        li.textContent = jd;
        ul.appendChild(li);
      })
      
      container.appendChild(dates);
      pos_container.append(position);
      if (row[link]){
        const gh_link = document.createElement("a");
        gh_link.textContent = "Project Repository";
        gh_link.setAttribute("href", row[link]);
        gh_link.setAttribute("target", "_blank");
        gh_link.style.color="rgb(136, 183, 181)";
        gh_link.style.fontSize="16px";
        gh_link.style.padding="4px";
        pos_container.appendChild(gh_link)
      }
      pos_container.appendChild(ul);

      container.appendChild(pos_container)
      container.style.marginBottom="15px"

      pc.appendChild(container);
    });

    experience.appendChild(pc)

  })
  .catch((e) => console.error(e));


  const proj = "csvs/projects.csv";

  fetch(proj)
    .then((res) => res.text())
    .then((text) => {

  
      const rows = text.split("\n").map(row => row.trim());
      const data = rows.slice(1).map((row) => {
        return row.split(",")
      });
      
      const projects = document.getElementById("projects")
      
      data.forEach(element => {
        const card = document.createElement("div")
        card.setAttribute("class", "card");
        const img = document.createElement("img")
        const info = document.createElement("div");
        const title = document.createElement("div");
        title.setAttribute("class", "title")

        const date = document.createElement("div");
        date.setAttribute("class", "date")

        const link = document.createElement("a");
        img.setAttribute("src", "images/"+element[3])
        img.setAttribute("class", "thumbnail");

        title.textContent=element[1];
        date.textContent=element[0];
        link.textContent=element[2];
        link.setAttribute("href", element[2]);
        link.setAttribute("target", "_blank");
        link.setAttribute("class", "date")

        info.appendChild(title);
        info.appendChild(date);
        info.appendChild(document.createElement("br"));
        info.appendChild(link);
        card.appendChild(img)
        card.appendChild(info)

        projects.appendChild(card)
      });

    })
  

    .catch((e) => console.error(e));



