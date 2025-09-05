// Tema
    const toggle = document.getElementById("toggleTema");

    // começa no modo escuro (sem a classe "light")
    document.documentElement.classList.remove("light");

    toggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("light");
});
    // ===== Dados dos Projetos (edite aqui) =====
    const projetos = [
      {
        titulo: "Loja Online (PHP + MySQL)",
        desc: "Cadastro de produtos, login de usuários e painel ADM.",
        tags: ["PHP","MySQL","HTML","CSS","JavaScript"],
        cat: ["web","apps"],
        demo: "#",
        code: "#",
        img: "https://www1.satc.edu.br/portais/alunos/assets/img/logoSatc2024.svg"   // <-- coloque a imagem aqui
      },
      {
        titulo: "Jogo 2D de Plataforma (Unity)",
        desc: "Inimigos, menu inicial e efeitos sonoros.",
        tags: ["Unity","C#","2D"],
        cat: ["games"],
        demo: "#",
        code: "#",
        img: "#"
      },
      {
        titulo: "Minigame no Minecraft (1.21)",
        desc: "Minigame criado com command blocks.",
        tags: ["Minecraft","Command Blocks"],
        cat: ["games"],
        demo: "#",
        code: "#",
        img: "#"
      },
    ];
  
    // ===== Utilidades =====
    const el = (sel, base=document)=> base.querySelector(sel);
    const els = (sel, base=document)=> [...base.querySelectorAll(sel)];
  
    const grid = el("#grid");
    const busca = el("#busca");
    const chips = els(".chip");
    const countTotal = el("#countTotal");
    const countVisiveis = el("#countVisiveis");
  
    function cardTemplate(p){
      const tags = p.tags.map(t=>`<span class="tag">${t}</span>`).join("");
      return `
        <article class="card" data-cat="${p.cat.join(" ")}" data-text="${(p.titulo+ " " + p.desc+ " " + p.tags.join(" ")).toLowerCase()}">
          <div class="cover" aria-hidden="true">
            ${p.img 
              ? `<img src="${p.img}" alt="${p.titulo}" style="width:100%;height:100%;object-fit:cover">`
              : `<svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z" stroke="currentColor" stroke-width="1.4"/>
                  <path d="M8 14.5 10.8 12l2.4 2.3L16 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`}
          </div>
          <div class="body">
            <div class="title">${p.titulo}</div>
            <div class="desc">${p.desc}</div>
            <div class="tags">${tags}</div>
            <div class="links">
              <a class="link" href="${p.demo}" target="_blank" rel="noopener">Demo</a>
              <a class="link" href="${p.code}" target="_blank" rel="noopener">Código</a>
            </div>
          </div>
        </article>`;
    }
  
    function render(){
      grid.innerHTML = projetos.map(cardTemplate).join("");
      countTotal.textContent = projetos.length;
      filtrar();
    }
  
    function filtrar(){
      const ativo = el(".chip.active")?.dataset.filter || "all";
      const termo = (busca.value || "").toLowerCase().trim();
      let visiveis = 0;
      els(".card", grid).forEach(card=>{
        const byCat = ativo==="all" || card.dataset.cat.includes(ativo);
        const byText = !termo || card.dataset.text.includes(termo);
        const show = byCat && byText;
        card.style.display = show ? "" : "none";
        if(show) visiveis++;
      });
      countVisiveis.textContent = visiveis;
    }
  
    chips.forEach(ch=>{
      ch.addEventListener("click", ()=>{
        chips.forEach(c=>c.classList.remove("active"));
        ch.classList.add("active");
        filtrar();
      })
    });
    busca.addEventListener("input", filtrar);
  
    // Ano no rodapé
    document.getElementById("ano").textContent = new Date().getFullYear();
  
    // Inicializa
    render();