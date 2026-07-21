/**
 * index.js - Interactive family tree (Zheti Ata) drawing logic using D3.js.
 * Supports horizontal/vertical layouts, search, path highlight, language toggling, and detail sidebars.
 */

// --- 1. Tree Data Structure ---
const treeData = {
  id: "torgay",
  nameKz: "Торғай",
  nameRu: "Торгай",
  generation: 1,
  children: [
    {
      id: "baluan",
      nameKz: "Балуан",
      nameRu: "Балуан",
      generation: 2,
      children: [
        {
          id: "tike",
          nameKz: "Тіке",
          nameRu: "Тике",
          generation: 3,
          children: [
            {
              id: "elaman",
              nameKz: "Еламан",
              nameRu: "Еламан",
              generation: 4,
              children: [
                // 1. Shokotay branch
                {
                  id: "shokotay",
                  nameKz: "Шокотай",
                  nameRu: "Шокотай",
                  generation: 5,
                  children: [
                    {
                      id: "satybaldy",
                      nameKz: "Сатыбалды",
                      nameRu: "Сатыбалды",
                      generation: 6
                    },
                    {
                      id: "mukhamedyar",
                      nameKz: "Мұхамедяр",
                      nameRu: "Мухамедяр",
                      generation: 6,
                      children: [
                        {
                          id: "kayrbek",
                          nameKz: "Қайрбек",
                          nameRu: "Каирбек",
                          generation: 7,
                          children: [
                            {
                              id: "serik",
                              nameKz: "Серік",
                              nameRu: "Серик",
                              generation: 8,
                              children: [
                                { id: "baurzhan", nameKz: "Бауыржан", nameRu: "Бауржан", generation: 9 },
                                { id: "sultan", nameKz: "Сұлтан", nameRu: "Султан", generation: 9 }
                              ]
                            },
                            {
                              id: "ermek",
                              nameKz: "Ермек",
                              nameRu: "Ермек",
                              generation: 8,
                              children: [
                                { 
                                  id: "ruslan", 
                                  nameKz: "Руслан", 
                                  nameRu: "Руслан", 
                                  generation: 9,
                                  children: [
                                    { id: "tigran", nameKz: "Тигран", nameRu: "Тигран", generation: 10}
                                  ]
                                 }
                              ]
                            },
                            {
                              id: "kaergeldy",
                              nameKz: "Қайыргелді",
                              nameRu: "Каергельды",
                              generation: 8,
                              children: [
                                { id: "zhanat", nameKz: "Жанат", nameRu: "Жанат", generation: 9 }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                // 2. Zhanibek branch
                {
                  id: "zhanibek",
                  nameKz: "Жәнібек",
                  nameRu: "Жанибек",
                  generation: 5,
                  children: [
                    {
                      id: "musaldy",
                      nameKz: "Мүсәлдә",
                      nameRu: "Мусалды",
                      generation: 6,
                      children: [
                        {
                          id: "akymet",
                          nameKz: "Ақымет",
                          nameRu: "Акымет",
                          generation: 7,
                          children: [
                            {
                              id: "suleymen",
                              nameKz: "Сүлеймен",
                              nameRu: "Сулеймен",
                              generation: 8,
                              children: [
                                { id: "tolegen1", nameKz: "Төлеген", nameRu: "Толеген", generation: 9 },
                                { id: "taymas", nameKz: "Таймас", nameRu: "Таймас", isCorrection: true, generation: 9 },
                                { id: "tanirbergen", nameKz: "Тәңірберген", nameRu: "Танырберген", generation: 9 },
                                { id: "abay", nameKz: "Абай", nameRu: "Абай", generation: 9 },
                                { id: "abylay", nameKz: "Абылай", nameRu: "Абылай", generation: 9 }
                              ]
                            }
                          ]
                        },
                        {
                          id: "mukametzhan",
                          nameKz: "Мұқаметжан",
                          nameRu: "Мукаметжан",
                          generation: 7
                        },
                        {
                          id: "mukhamedia",
                          nameKz: "Мұхамедиа",
                          nameRu: "Мухамедиа",
                          generation: 7,
                          children: [
                            { id: "kasen", nameKz: "Қасен", nameRu: "Касен", generation: 8 }
                          ]
                        }
                      ]
                    }
                  ]
                },
                // 3. Zhanzak branch
                {
                  id: "zhanzak",
                  nameKz: "Жанзақ",
                  nameRu: "Жанзак",
                  generation: 5,
                  children: [
                    {
                      id: "zhaksylyk",
                      nameKz: "Жақсылық",
                      nameRu: "Жаксылык",
                      generation: 6,
                      children: [
                        {
                          id: "duysembay",
                          nameKz: "Дүйсембай",
                          nameRu: "Дуисембай",
                          generation: 7,
                          children: [
                            { id: "baglan", nameKz: "Бағлан", nameRu: "Баглан", generation: 8 },
                            {
                              id: "bakytzhan",
                              nameKz: "Бақытжан",
                              nameRu: "Бакытжан",
                              generation: 8,
                              children: [
                                { id: "zhaksylyk_bakytzhan", nameKz: "Жақсылық", nameRu: "Жаксылык", generation: 9 }
                              ]
                            },
                            {
                              id: "erzhan",
                              nameKz: "Ержан",
                              nameRu: "Ержан",
                              generation: 8,
                              children: [
                                { id: "amir", nameKz: "Әмір", nameRu: "Амир", generation: 9 },
                                { id: "samat", nameKz: "Самат", nameRu: "Самат", generation: 9 },
                                { id: "arlan", nameKz: "Арлан", nameRu: "Арлан", generation: 9 }
                              ]
                            },
                            { id: "serikzhan", nameKz: "Серікжан", nameRu: "Серыкжан", generation: 8 }
                          ]
                        }
                      ]
                    }
                  ]
                },
                // 4. Kunzak branch
                {
                  id: "kunzak",
                  nameKz: "Күнзақ",
                  nameRu: "Кунзак",
                  isCorrection: true,
                  generation: 5,
                  children: [
                    {
                      id: "nurmagzan",
                      nameKz: "Нұрмағзан",
                      nameRu: "Нурмагзан",
                      generation: 6,
                      children: [
                        {
                          id: "zhakiya",
                          nameKz: "Жақия",
                          nameRu: "Жакиа",
                          generation: 7,
                          children: [
                            { id: "konysbay", nameKz: "Қонысбай", nameRu: "Конысбай", generation: 8 },
                            {
                              id: "bolat",
                              nameKz: "Болат",
                              nameRu: "Болат",
                              generation: 8,
                              children: [
                                { 
                                  id: "murat", 
                                  nameKz: "Мұрат", 
                                  nameRu: "Мурат", 
                                  generation: 9,
                                  children: [
                                    { id: "jaslan", nameKz: "Жаслан", nameRu: "Жаслан", generation: 10 }
                                  ]
                                },
                                {
                                  id: "zhanat_bolat",
                                  nameKz: "Жанат",
                                  nameRu: "Жанат",
                                  generation: 9,
                                  children: [
                                    { id: "dias", nameKz: "Диас", nameRu: "Диас", generation: 10 }
                                  ]
                                },
                                { 
                                  id: "zhumat", 
                                  nameKz: "Жұмат", 
                                  nameRu: "Жумат", 
                                  generation: 9
                                },
                                { 
                                  id: "askhat",
                                  nameKz: "Асхат", 
                                  nameRu: "Асхат", 
                                  generation: 9,
                                  children: [
                                    { id: "erlan", nameKz: "Ерлан", nameRu: "Ерлан", generation: 10 }
                                  ] 
                                }
                              ]
                            },
                            { id: "dulat", nameKz: "Дулат", nameRu: "Дулат", generation: 8 }
                          ]
                        },
                        {
                          id: "zholdybay",
                          nameKz: "Жолдыбай",
                          nameRu: "Жолдыбай",
                          generation: 7
                        }
                      ]
                    },
                    {
                      id: "zeynolla",
                      nameKz: "Зейнолла",
                      nameRu: "Зейнолла",
                      generation: 6
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// --- 2. Application State ---
let currentLang = "ru"; // 'kz' or 'ru'
let currentLayout = "vertical"; // 'horizontal' or 'vertical'
let navMode = "mouse"; // 'mouse' or 'trackpad'
let selectedNodeId = null;
let zoomBehavior = null;
let svg = null;
let gContainer = null;
let rootNode = null; // d3 hierarchy root

// Canvas dimensions
const nodeWidth = 140;
const nodeHeight = 50;

// --- 3. D3 Rendering Engine ---
function initTree() {
  svg = d3.select("#family-tree");
  gContainer = svg.select("#g-container");

  // Create D3 hierarchy
  rootNode = d3.hierarchy(treeData);

  // Initialize Zoom behavior
  zoomBehavior = d3.zoom()
    .scaleExtent([0.1, 3])
    .on("zoom", (event) => {
      gContainer.attr("transform", event.transform);
    });

  svg.call(zoomBehavior);

  // Disable default D3 wheel zoom permanently to prevent conflicts with passive listeners
  svg.on("wheel.zoom", null);

  // Setup unified wheel event listener for custom touchpad/mouse behavior via native listener
  const svgEl = svg.node();
  svgEl.addEventListener("wheel", (event) => {
    event.preventDefault(); // Always prevent default scroll behavior to avoid double page scroll
    
    if (navMode === "trackpad") {
      // Trackpad Mode: pinch to zoom, two-finger swipe to pan in any direction
      if (event.ctrlKey || event.metaKey) {
        const factor = Math.exp(-event.deltaY * 0.01);
        const mouse = d3.pointer(event, svgEl);
        zoomBehavior.scaleBy(svg, factor, mouse);
      } else {
        zoomBehavior.translateBy(svg, -event.deltaX, -event.deltaY);
      }
    } else {
      // Mouse Mode (Figma-like navigation):
      const isZoom = event.ctrlKey || event.metaKey;
      
      if (isZoom) {
        // Ctrl + Scroll (or Cmd + Scroll on macOS) -> Zoom
        const factor = Math.exp(-event.deltaY * 0.0015);
        const mouse = d3.pointer(event, svgEl);
        zoomBehavior.scaleBy(svg, factor, mouse);
      } else if (event.shiftKey) {
        // Shift + Scroll -> Pan Horizontally
        // Browsers on macOS (Safari/Chrome) automatically map Shift+scroll to deltaX.
        // On other setups/OS, it might remain in deltaY. We handle both cases.
        const dx = event.deltaX !== 0 ? event.deltaX : event.deltaY;
        zoomBehavior.translateBy(svg, -dx, 0);
      } else {
        // Plain Scroll -> Pan Vertically
        zoomBehavior.translateBy(svg, 0, -event.deltaY);
      }
    }
  }, { passive: false });

  // Initial draw
  drawTree();
  
  // Center tree on load
  setTimeout(() => {
    resetView();
    updateNavMode();
  }, 100);
}

function drawTree() {
  const width = svg.node().clientWidth;
  const height = svg.node().clientHeight;

  // Choose tree layout
  const treeLayout = d3.tree();
  
  if (currentLayout === "vertical") {
    // Top-to-Bottom
    // nodeSize: [width spacer, height spacer]
    treeLayout.nodeSize([nodeWidth * 1.5, nodeHeight * 2.2]);
  } else {
    // Left-to-Right
    treeLayout.nodeSize([nodeHeight * 1.8, nodeWidth * 1.8]);
  }

  // Calculate coordinates
  const treeInfo = treeLayout(rootNode);
  const nodes = treeInfo.descendants();
  const links = treeInfo.links();

  // Swap coordinates based on layout direction
  nodes.forEach(d => {
    if (currentLayout === "vertical") {
      // y-coord is down (generation level)
      d.renderX = d.x;
      d.renderY = d.y;
    } else {
      // x-coord is vertical position, y-coord is horizontal level (generation)
      d.renderX = d.y;
      d.renderY = d.x;
    }
  });

  // --- Draw Links (Connections) ---
  const linkPathGenerator = d3.linkVertical()
    .x(d => d.renderX)
    .y(d => d.renderY);

  const linkPathHorizontalGenerator = d3.linkHorizontal()
    .x(d => d.renderX)
    .y(d => d.renderY);

  const linkGenerator = currentLayout === "vertical" ? linkPathGenerator : linkPathHorizontalGenerator;

  const linkSelection = gContainer.selectAll(".link")
    .data(links, d => d.target.data.id);

  // Exit links
  linkSelection.exit().remove();

  // Enter + Update links
  const enteredLinks = linkSelection.enter()
    .append("path")
    .attr("class", "link");

  enteredLinks.merge(linkSelection)
    .transition()
    .duration(500)
    .attr("d", linkGenerator)
    .attr("class", d => {
      const isHighlighted = isAncestorPath(d.target);
      return `link ${isHighlighted ? 'highlighted' : ''}`;
    });

  // --- Draw Nodes ---
  const nodeSelection = gContainer.selectAll(".node")
    .data(nodes, d => d.data.id);

  // Exit nodes
  nodeSelection.exit().remove();

  // Enter nodes
  const enteredNodes = nodeSelection.enter()
    .append("g")
    .attr("class", "node")
    .on("click", (event, d) => {
      event.stopPropagation();
      selectNode(d);
    });

  // Node Box
  enteredNodes.append("rect")
    .attr("width", nodeWidth)
    .attr("height", nodeHeight)
    .attr("x", -nodeWidth / 2)
    .attr("y", -nodeHeight / 2);

  // Node Name text
  enteredNodes.append("text")
    .attr("class", "node-name")
    .attr("y", -4);

  // Node Details / Gen label
  enteredNodes.append("text")
    .attr("class", "node-generation")
    .attr("y", 14);

  // Merge & Update Nodes
  const updatedNodes = enteredNodes.merge(nodeSelection);

  updatedNodes.transition()
    .duration(500)
    .attr("transform", d => `translate(${d.renderX}, ${d.renderY})`);

  // Update text values and classes
  updatedNodes.each(function(d) {
    const nodeEl = d3.select(this);
    
    // Dynamic text selection
    const displayName = currentLang === "kz" ? d.data.nameKz : d.data.nameRu;
    nodeEl.select(".node-name").text(displayName);
    
    const genName = currentLang === "kz" ? `${d.data.generation}-ші ата` : `${d.data.generation} поколение`;
    nodeEl.select(".node-generation").text(genName);

    // Apply classes for highlighting
    let classList = "node";
    if (d.data.id === selectedNodeId) {
      classList += " selected";
    } else if (isAncestorPath(d)) {
      classList += " highlighted";
    }
    
    if (d.data.generation === 1) {
      classList += " special-ancestor";
    }
    
    nodeEl.attr("class", classList);
  });
}

// Check if node is part of the path from the selected node up to the root
function isAncestorPath(node) {
  if (!selectedNodeId) return false;
  
  // Find the selected node object
  let target = null;
  rootNode.each(d => {
    if (d.data.id === selectedNodeId) {
      target = d;
    }
  });

  if (!target) return false;

  // Walk up from target to root
  let curr = target;
  while (curr) {
    if (curr.data.id === node.data.id) {
      return true;
    }
    curr = curr.parent;
  }
  
  return false;
}

// --- 4. Interactive Utilities ---
function selectNode(d) {
  selectedNodeId = d.data.id;
  
  // Re-draw tree to update styling (glowing nodes, glowing lines)
  drawTree();

  // Populate and show the details panel
  showDetailDrawer(d);
}

function showDetailDrawer(d) {
  const drawer = document.getElementById("detail-drawer");
  
  const nameVal = currentLang === "kz" ? d.data.nameKz : d.data.nameRu;
  const genLabel = currentLang === "kz" ? `${d.data.generation}-ші ата (ұрпақ)` : `${d.data.generation}-е поколение (потомство)`;
  
  document.getElementById("drawer-name").innerText = nameVal;
  document.getElementById("drawer-gen").innerText = genLabel;

  // --- Ancestor path list (Zheti Ata) ---
  const ancestorList = [];
  let curr = d;
  while (curr) {
    ancestorList.push(curr);
    curr = curr.parent;
  }
  
  const pathTitle = currentLang === "kz" ? "Шежіре (Жеті Ата)" : "Родословная ветвь (Жеты Ата)";
  document.getElementById("drawer-path-title").innerText = pathTitle;
  
  const pathHtml = ancestorList.map((node, index) => {
    const name = currentLang === "kz" ? node.data.nameKz : node.data.nameRu;
    const arrow = index < ancestorList.length - 1 ? " ← " : "";
    const isCurrent = index === 0;
    const style = isCurrent ? "color: var(--accent-emerald); font-weight: bold;" : "color: var(--text-secondary);";
    
    return `<span style="${style}" onclick="focusNodeById('${node.data.id}')" class="clickable-path-node" title="Focus node">${name}</span>${arrow}`;
  }).join("");
  
  document.getElementById("drawer-path").innerHTML = pathHtml;

  // --- Parent Info ---
  const parentContainer = document.getElementById("drawer-parent-container");
  if (d.parent) {
    const parentName = currentLang === "kz" ? d.parent.data.nameKz : d.parent.data.nameRu;
    parentContainer.innerHTML = `
      <div class="drawer-info-card" onclick="focusNodeById('${d.parent.data.id}')">
        <span class="drawer-info-label">${currentLang === 'kz' ? 'Әкесі' : 'Отец'}</span>
        <span class="drawer-info-val">${parentName}</span>
      </div>`;
  } else {
    parentContainer.innerHTML = `<span style="font-size:0.875rem; color: var(--text-muted);">${currentLang === 'kz' ? 'Басы' : 'Основоположник'}</span>`;
  }

  // --- Children List ---
  const childrenContainer = document.getElementById("drawer-children-list");
  if (d.children && d.children.length > 0) {
    let childrenHtml = "";
    d.children.forEach(child => {
      const childName = currentLang === "kz" ? child.data.nameKz : child.data.nameRu;
      childrenHtml += `
        <div class="drawer-list-item" onclick="focusNodeById('${child.data.id}')">
          <span>${childName}</span>
          <span class="drawer-list-item-icon">➔</span>
        </div>`;
    });
    childrenContainer.innerHTML = childrenHtml;
  } else {
    childrenContainer.innerHTML = `<span style="font-size:0.875rem; color: var(--text-muted);">${currentLang === 'kz' ? 'Ұрпақтары жазылмаған' : 'Сыновья не указаны'}</span>`;
  }

  // --- Siblings List ---
  const siblingsContainer = document.getElementById("drawer-siblings-list");
  let siblings = [];
  if (d.parent && d.parent.children) {
    siblings = d.parent.children.filter(sibling => sibling.data.id !== d.data.id);
  }
  
  if (siblings.length > 0) {
    let siblingsHtml = "";
    siblings.forEach(sibling => {
      const sibName = currentLang === "kz" ? sibling.data.nameKz : sibling.data.nameRu;
      siblingsHtml += `
        <div class="drawer-list-item" onclick="focusNodeById('${sibling.data.id}')">
          <span>${sibName}</span>
          <span class="drawer-list-item-icon">➔</span>
        </div>`;
    });
    siblingsContainer.innerHTML = siblingsHtml;
  } else {
    siblingsContainer.innerHTML = `<span style="font-size:0.875rem; color: var(--text-muted);">${currentLang === 'kz' ? 'Жалғыз ұл' : 'Братьев нет'}</span>`;
  }

  // Open drawer
  drawer.classList.add("open");
  const container = document.querySelector(".app-container");
  if (container) container.classList.add("drawer-open");
}

function closeDetailDrawer() {
  document.getElementById("detail-drawer").classList.remove("open");
  const container = document.querySelector(".app-container");
  if (container) container.classList.remove("drawer-open");
  selectedNodeId = null;
  drawTree();
}

// Center view and zoom to show the entire tree
function resetView() {
  if (!svg || !rootNode) return;
  
  const width = svg.node().clientWidth;
  const height = svg.node().clientHeight;
  
  // Calculate bounding box of all nodes
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  rootNode.each(d => {
    if (d.renderX < minX) minX = d.renderX;
    if (d.renderX > maxX) maxX = d.renderX;
    if (d.renderY < minY) minY = d.renderY;
    if (d.renderY > maxY) maxY = d.renderY;
  });

  const treeWidth = maxX - minX + nodeWidth * 1.5;
  const treeHeight = maxY - minY + nodeHeight * 1.5;
  
  const scale = Math.min(0.85, Math.min(width / treeWidth, height / treeHeight));
  
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  
  const transform = d3.zoomIdentity
    .translate(width / 2 - midX * scale, height / 2 - midY * scale)
    .scale(scale);
    
  svg.transition()
    .duration(800)
    .call(zoomBehavior.transform, transform);
}

// Smoothly zoom in or out by a multiplier
function zoomBy(multiplier) {
  svg.transition()
    .duration(300)
    .call(zoomBehavior.scaleBy, multiplier);
}

// Find a node by ID, highlight, open drawer, and center view on it
function focusNodeById(id) {
  let target = null;
  rootNode.each(d => {
    if (d.data.id === id) {
      target = d;
    }
  });

  if (!target) return;

  // Close mobile controls menu when focusing on a node
  closeMobileMenu();

  // Set as selected
  selectedNodeId = id;
  drawTree();
  showDetailDrawer(target);

  // Zoom to target node
  const width = svg.node().clientWidth;
  const height = svg.node().clientHeight;
  
  const scale = 1.0; // zoom level
  const transform = d3.zoomIdentity
    .translate(width / 2 - target.renderX * scale, height / 2 - target.renderY * scale)
    .scale(scale);

  svg.transition()
    .duration(800)
    .call(zoomBehavior.transform, transform);
}

// --- 5. Search Suggestion Box ---
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const suggestionsDiv = document.getElementById("suggestions");

  // Flat list of all members for autocomplete
  const allMembers = [];
  rootNode.each(d => {
    allMembers.push({
      id: d.data.id,
      nameKz: d.data.nameKz,
      nameRu: d.data.nameRu,
      generation: d.data.generation,
      node: d
    });
  });

  searchInput.addEventListener("input", function() {
    const val = this.value.trim().toLowerCase();
    
    if (!val) {
      suggestionsDiv.style.display = "none";
      return;
    }

    // Filter members matching query in either KZ or RU spellings
    const matches = allMembers.filter(m => 
      m.nameKz.toLowerCase().includes(val) || 
      m.nameRu.toLowerCase().includes(val)
    );

    if (matches.length === 0) {
      suggestionsDiv.innerHTML = `<div class="suggestion-item" style="color:var(--text-muted); cursor:default;">${currentLang === 'kz' ? 'Табылмады' : 'Ничего не найдено'}</div>`;
      suggestionsDiv.style.display = "block";
      return;
    }

    // Build suggestion item HTML
    let html = "";
    matches.slice(0, 8).forEach(m => {
      const name = currentLang === "kz" ? m.nameKz : m.nameRu;
      const pathText = getAncestoPathString(m.node);
      html += `
        <div class="suggestion-item" data-id="${m.id}">
          <span class="suggestion-name">${name}</span>
          <span class="suggestion-branch">${pathText}</span>
        </div>`;
    });

    suggestionsDiv.innerHTML = html;
    suggestionsDiv.style.display = "block";

    // Click handler for suggestion items
    suggestionsDiv.querySelectorAll(".suggestion-item").forEach(item => {
      item.addEventListener("click", function() {
        const id = this.getAttribute("data-id");
        focusNodeById(id);
        searchInput.value = "";
        suggestionsDiv.style.display = "none";
      });
    });
  });

  // Hide suggestion list when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target !== searchInput && e.target !== suggestionsDiv) {
      suggestionsDiv.style.display = "none";
    }
  });
}

// Generate simple string representing lineage for search dropdown helper
function getAncestoPathString(node) {
  const path = [];
  let curr = node.parent;
  while (curr) {
    path.push(currentLang === "kz" ? curr.data.nameKz : curr.data.nameRu);
    curr = curr.parent;
  }
  if (path.length === 0) return currentLang === "kz" ? "Основоположник" : "Основатель";
  return path.slice(0, 3).join(" ➔ ") + (path.length > 3 ? "..." : "");
}

// --- 6. Setters & Config Handlers ---
// Mobile menu toggle logic
function toggleMobileMenu() {
  const controls = document.querySelector(".top-controls");
  if (!controls) return;
  controls.classList.toggle("open");
  const isExpanded = controls.classList.contains("open");
  const toggleSpan = document.getElementById("menu-toggle").querySelector("span");
  if (toggleSpan) toggleSpan.innerText = isExpanded ? "✕" : "☰";
}

function closeMobileMenu() {
  const controls = document.querySelector(".top-controls");
  if (controls && controls.classList.contains("open")) {
    controls.classList.remove("open");
    const toggleSpan = document.getElementById("menu-toggle").querySelector("span");
    if (toggleSpan) toggleSpan.innerText = "☰";
  }
}

function setSpelling(lang) {
  currentLang = lang;
  
  // Update toggle button states
  document.getElementById("toggle-kz").classList.toggle("active", lang === "kz");
  document.getElementById("toggle-ru").classList.toggle("active", lang === "ru");
  
  // Re-draw tree names
  drawTree();

  // If a node is selected, update details drawer language
  if (selectedNodeId) {
    let selectedNode = null;
    rootNode.each(d => {
      if (d.data.id === selectedNodeId) selectedNode = d;
    });
    if (selectedNode) showDetailDrawer(selectedNode);
  }

  // Update layout button translation strings
  updateStaticTexts();
}

function setLayout(layout) {
  currentLayout = layout;
  
  // Update layout button states
  document.getElementById("layout-vertical").style.background = layout === "vertical" ? "var(--bg-tertiary)" : "";
  document.getElementById("layout-horizontal").style.background = layout === "horizontal" ? "var(--bg-tertiary)" : "";
  
  drawTree();
  resetView();
  
  // Close mobile controls menu
  closeMobileMenu();
}
  
 function updateStaticTexts() {
  const texts = {
    kz: {
      title: "Қайырбек ұрпақтары шежіресі",
      subtitle: "Соқыр-Керей (Күрсәрі)",
      searchPlaceholder: "Іздеу...",
      legendTitle: "Белгілер",
      legendAncestor: "Ортақ Ата",
      legendNode: "Ұрпақ",
      legendSel: "Таңдалған мүше",
      legendPath: "Шежіре жолы",
      closeDrawer: "Жабу",
      drawerParent: "Әкесі",
      drawerChildren: "Ұлдары",
      drawerSiblings: "Ағайындылар",
      layoutVertical: "Тік шежіре",
      layoutHorizontal: "Көлденең шежіре",
      exportPNG: "PNG ретінде жүктеу",
      exportSVG: "SVG ретінде жүктеу"
    },
    ru: {
      title: "Шежире ветви Каирбека",
      subtitle: "Сокыр-Керей (Курсари)",
      searchPlaceholder: "Поиск...",
      legendTitle: "Легенда",
      legendAncestor: "Общий Предок",
      legendNode: "Потомок",
      legendSel: "Выбранный член",
      legendPath: "Линия шежире",
      closeDrawer: "Закрыть",
      drawerParent: "Отец",
      drawerChildren: "Сыновья",
      drawerSiblings: "Братья",
      layoutVertical: "Вертикальное дерево",
      layoutHorizontal: "Горизонтальное дерево",
      exportPNG: "Скачать как PNG",
      exportSVG: "Скачать как SVG"
    }
  };

  const t = texts[currentLang];
  document.getElementById("app-title").innerText = t.title;
  document.getElementById("app-subtitle").innerText = t.subtitle;
  document.getElementById("search-input").placeholder = t.searchPlaceholder;
  document.getElementById("legend-title").innerText = t.legendTitle;
  document.getElementById("legend-ancestor-label").innerText = t.legendAncestor;
  document.getElementById("legend-node-label").innerText = t.legendNode;
  document.getElementById("legend-sel-label").innerText = t.legendSel;
  document.getElementById("legend-path-label").innerText = t.legendPath;

  // Update Drawer titles
  document.getElementById("drawer-parent-title").innerText = t.drawerParent;
  document.getElementById("drawer-children-title").innerText = t.drawerChildren;
  document.getElementById("drawer-siblings-title").innerText = t.drawerSiblings;
  document.getElementById("drawer-close-btn").title = t.closeDrawer;

  // Update Layout and Export button titles
  document.getElementById("layout-vertical").title = t.layoutVertical;
  document.getElementById("layout-horizontal").title = t.layoutHorizontal;
  
  const btnPng = document.getElementById("btn-export-png");
  if (btnPng) btnPng.title = t.exportPNG;
  const btnSvg = document.getElementById("btn-export-svg");
  if (btnSvg) btnSvg.title = t.exportSVG;

  // Sync navigation mode button tooltip language
  updateNavMode();
}

// Close the banner at top
function closeBanner() {
  document.getElementById("info-banner").style.display = "none";
}

// Helper to generate self-contained SVG content including themes and styles
function getExportableSVGString() {
  const svgEl = document.querySelector("#family-tree");
  const clone = svgEl.cloneNode(true);
  
  const width = svgEl.clientWidth || 1200;
  const height = svgEl.clientHeight || 800;
  
  clone.setAttribute("width", width);
  clone.setAttribute("height", height);
  clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  
  // Inject computed styles from document body to resolve CSS variables in SVG context
  const computedStyle = getComputedStyle(document.body);
  const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
  styleEl.textContent = `
    svg {
      background-color: ${computedStyle.getPropertyValue('--bg-primary')};
      --bg-primary: ${computedStyle.getPropertyValue('--bg-primary')};
      --bg-secondary: ${computedStyle.getPropertyValue('--bg-secondary')};
      --bg-tertiary: ${computedStyle.getPropertyValue('--bg-tertiary')};
      --text-primary: ${computedStyle.getPropertyValue('--text-primary')};
      --text-secondary: ${computedStyle.getPropertyValue('--text-secondary')};
      --text-muted: ${computedStyle.getPropertyValue('--text-muted')};
      --accent-gold: ${computedStyle.getPropertyValue('--accent-gold')};
      --accent-emerald: ${computedStyle.getPropertyValue('--accent-emerald')};
      --accent-blue: ${computedStyle.getPropertyValue('--accent-blue')};
      --link-color: ${computedStyle.getPropertyValue('--link-color')};
      --glass-border: ${computedStyle.getPropertyValue('--glass-border')};
    }
    .link {
      fill: none;
      stroke: var(--link-color);
      stroke-width: 2px;
    }
    .link.highlighted {
      stroke: var(--accent-gold);
      stroke-width: 4px;
    }
    .node rect {
      fill: var(--bg-secondary);
      stroke: var(--glass-border);
      stroke-width: 1.5px;
      rx: 12px;
      ry: 12px;
    }
    .node.selected rect {
      stroke: var(--accent-emerald);
      stroke-width: 2.5px;
      fill: rgba(16, 185, 129, 0.15);
    }
    .node.highlighted rect {
      stroke: var(--accent-gold);
      stroke-width: 2.5px;
      fill: rgba(245, 158, 11, 0.15);
    }
    .node.special-ancestor rect {
      stroke: var(--accent-gold);
      fill: rgba(245, 158, 11, 0.1);
    }
    .node text {
      fill: var(--text-primary);
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-anchor: middle;
    }
    .node .node-generation {
      fill: var(--text-secondary);
      font-size: 10px;
      font-weight: 400;
    }
  `;
  
  clone.insertBefore(styleEl, clone.firstChild);
  return new XMLSerializer().serializeToString(clone);
}

// --- 7. SVG / PNG Export Handler ---
function exportPNG() {
  const svgEl = document.querySelector("#family-tree");
  const width = svgEl.clientWidth || 1200;
  const height = svgEl.clientHeight || 800;
  
  const svgString = getExportableSVGString();
  
  const canvas = document.createElement("canvas");
  canvas.width = width * 2; // double resolution for high quality
  canvas.height = height * 2;
  const ctx = canvas.getContext("2d");
  ctx.scale(2, 2);
  
  const img = new Image();
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = function() {
    // Fill background color matching theme
    const computedStyle = getComputedStyle(document.body);
    ctx.fillStyle = computedStyle.getPropertyValue('--bg-primary').trim();
    ctx.fillRect(0, 0, width, height);
    
    // Draw SVG onto canvas
    ctx.drawImage(img, 0, 0, width, height);
    
    // Trigger download
    const link = document.createElement("a");
    link.download = `zheti_ata_shezhire_${currentLang}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    
    URL.revokeObjectURL(url);
  };
  
  img.src = url;
}

function exportSVG() {
  const svgString = getExportableSVGString();
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  
  const link = document.createElement("a");
  link.download = `zheti_ata_shezhire_${currentLang}.svg`;
  link.href = URL.createObjectURL(blob);
  link.click();
}

// --- 8. Initialize App on DOM Content Loaded ---
document.addEventListener("DOMContentLoaded", () => {
  initTree();
  setupSearch();
  updateStaticTexts();
  
  // Handle resize events
  window.addEventListener("resize", () => {
    drawTree();
  });
});

// Bind functions to window object for HTML inline event listeners
window.focusNodeById = focusNodeById;
window.setSpelling = setSpelling;
window.setLayout = setLayout;
window.exportPNG = exportPNG;
window.exportSVG = exportSVG;
window.closeBanner = closeBanner;
window.closeDetailDrawer = closeDetailDrawer;
window.zoomBy = zoomBy;
window.resetView = resetView;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.toggleNavMode = toggleNavMode;

// Navigation mode managers
function updateNavMode() {
  const btn = document.getElementById("nav-mode-toggle");
  if (!btn) return;
  
  if (navMode === "trackpad") {
    btn.innerHTML = "💻";
    const titleText = currentLang === "kz" ? "Режим: Тачпад (Жылжыту үшін екі саусақпен сүйреңіз)" : "Режим: Тачпад (Свайп двумя пальцами для перемещения)";
    btn.title = titleText;
    btn.style.background = "var(--bg-tertiary)";
  } else {
    btn.innerHTML = "🖱️";
    const titleText = currentLang === "kz" ? "Режим: Тінтуір (Масштабтау үшін доңғалақты айналдырыңыз)" : "Режим: Мышь (Колесико для масштабирования)";
    btn.title = titleText;
    btn.style.background = "";
  }
}

function toggleNavMode() {
  navMode = navMode === "mouse" ? "trackpad" : "mouse";
  updateNavMode();
}
