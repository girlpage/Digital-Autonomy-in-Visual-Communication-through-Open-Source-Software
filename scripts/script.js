// ================================
// VS CODE SIDEBAR FUNCTIONALITY
// ================================

const indexBtn = document.getElementById('index-btn');
const indexDropdown = document.getElementById('index-dropdown');

// Create sidebar elements dynamically
function createSidebar() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Create sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'index-sidebar';
    
    // Get content from dropdown
    const dropdownContent = indexDropdown.innerHTML;
    
    // Build sidebar HTML - no header, no close button
    let sidebarHTML = `
        <div class="sidebar-content">
    `;
    
    // Parse and restructure the content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = dropdownContent;
    
    // Process each section
    const h2Elements = tempDiv.querySelectorAll('.h2');
    h2Elements.forEach((h2) => {
        const text = h2.querySelector('p').textContent;
        sidebarHTML += `
            <div class="h2" data-section="${text}">
                <p>${text}</p>
            </div>
        `;
        
        // Find following h3 elements (siblings until next h2)
        let nextElement = h2.nextElementSibling;
        while (nextElement && !nextElement.classList.contains('h2')) {
            if (nextElement.classList.contains('h3')) {
                const h3Text = nextElement.querySelector('p').textContent;
                sidebarHTML += `
                    <div class="h3" data-section="${h3Text}">
                        <p>${h3Text}</p>
                    </div>
                `;
            }
            nextElement = nextElement.nextElementSibling;
        }
    });
    
    sidebarHTML += '</div>';
    sidebar.innerHTML = sidebarHTML;
    document.body.appendChild(sidebar);
    
    // Add event listeners
    const overlayEl = document.getElementById('sidebar-overlay');
    
    // Close sidebar functions
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlayEl.classList.remove('visible');
        document.body.classList.remove('sidebar-open');
    }
    
    function openSidebar() {
        sidebar.classList.add('open');
        overlayEl.classList.add('visible');
        document.body.classList.add('sidebar-open');
    }
    
    // Toggle sidebar
    indexBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
    
    // Close on overlay click
    overlayEl.addEventListener('click', closeSidebar);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
    
    // Handle sidebar item clicks - scroll to section
    sidebar.querySelectorAll('.h2, .h3').forEach(item => {
        item.addEventListener('click', () => {
            const sectionText = item.getAttribute('data-section');
            // Find matching content in reading area
            const contentElements = document.querySelectorAll('#reading-area .h2 p, #reading-area .h3 p');
            let found = false;
            contentElements.forEach(el => {
                if (!found && el.textContent.trim() === sectionText.trim()) {
                    const parent = el.closest('.h2, .h3');
                    if (parent) {
                        // Scroll with offset so title is visible
                        const navHeight = 80;
                        const blockTop = parent.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: blockTop - navHeight,
                            behavior: "smooth"
                        });
                        // Highlight the section immediately
                        highlightSection(parent);
                        setTimeout(syncLineNumberScroll, 300);
                        found = true;
                    }
                }
            });
            // Close sidebar after selection
            setTimeout(closeSidebar, 200);
        });
    });
}

// Initialize sidebar
createSidebar();

// ==============================
// GLOSSARY SIDEBAR FUNCTIONALITY
// ==============================

const glossaryBtn = document.getElementById('glossary-btn');
const glossaryDropdown = document.getElementById('glossary-dropdown');

// Create glossary sidebar elements dynamically
function createGlossarySidebar() {
    // Create sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'glossary-sidebar';
    
    // Get content from dropdown
    const dropdownContent = glossaryDropdown.innerHTML;
    
    // Build sidebar HTML - no header, no close button
    let sidebarHTML = `
        <div class="sidebar-content">
    `;
    
    // If there's content in the dropdown, process it
    if (dropdownContent.trim()) {
        // Parse and restructure the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = dropdownContent;
        
        // Process glossary items based on current language
        // Default to German if isGerman is not yet defined
        const currentIsGerman = (typeof isGerman !== 'undefined') ? isGerman : true;
        const glossarSelector = currentIsGerman ? '.glossar' : '.glossar-eng';
        const glossarItems = tempDiv.querySelectorAll(glossarSelector);
        glossarItems.forEach((item) => {
            const text = item.querySelector('p').textContent;
            if (text && text.trim()) {
                sidebarHTML += `
                    <div class="glossar-item">
                        <p>${text}</p>
                    </div>
                `;
            }
        });
        
        // Process each section (h2 and h3 elements)
        const h2Elements = tempDiv.querySelectorAll('.h2');
        h2Elements.forEach((h2) => {
            const text = h2.querySelector('p').textContent;
            sidebarHTML += `
                <div class="h2" data-section="${text}">
                    <p>${text}</p>
                </div>
            `;
            
            // Find following h3 elements (siblings until next h2)
            let nextElement = h2.nextElementSibling;
            while (nextElement && !nextElement.classList.contains('h2')) {
                if (nextElement.classList.contains('h3')) {
                    const h3Text = nextElement.querySelector('p').textContent;
                    sidebarHTML += `
                        <div class="h3" data-section="${h3Text}">
                            <p>${h3Text}</p>
                        </div>
                    `;
                }
                nextElement = nextElement.nextElementSibling;
            }
        });
    } else {
        // Empty state message
        sidebarHTML += `
            <div class="h2" style="padding: 16px; color: var(--white); opacity: 0.5;">
                <p>Glossary content will be added soon...</p>
            </div>
        `;
    }
    
    sidebarHTML += '</div>';
    sidebar.innerHTML = sidebarHTML;
    document.body.appendChild(sidebar);
    
    // Add event listeners
    // Reuse overlay from index sidebar
    const overlayEl = document.getElementById('sidebar-overlay');
    
    // Close sidebar functions
    function closeGlossarySidebar() {
        sidebar.classList.remove('open');
        overlayEl.classList.remove('visible');
        document.body.classList.remove('sidebar-open');
    }
    
    function openGlossarySidebar() {
        sidebar.classList.add('open');
        overlayEl.classList.add('visible');
        document.body.classList.add('sidebar-open');
    }
    
    // Toggle sidebar
    glossaryBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            closeGlossarySidebar();
        } else {
            openGlossarySidebar();
        }
    });
    
    // Close on overlay click
    overlayEl.addEventListener('click', () => {
        closeGlossarySidebar();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeGlossarySidebar();
        }
    });
    
    // Handle sidebar item clicks - scroll to section
    sidebar.querySelectorAll('.h2, .h3').forEach(item => {
        item.addEventListener('click', () => {
            const sectionText = item.getAttribute('data-section');
            // Find matching content in reading area
            const contentElements = document.querySelectorAll('#reading-area .h2 p, #reading-area .h3 p');
            let found = false;
            contentElements.forEach(el => {
                if (!found && el.textContent.trim() === sectionText.trim()) {
                    const parent = el.closest('.h2, .h3');
                    if (parent) {
                        // Scroll with offset so title is visible
                        const navHeight = 80;
                        const blockTop = parent.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: blockTop - navHeight,
                            behavior: "smooth"
                        });
                        // Highlight the section immediately
                        highlightSection(parent);
                        setTimeout(syncLineNumberScroll, 300);
                        found = true;
                    }
                }
            });
            // Close sidebar after selection
            setTimeout(closeGlossarySidebar, 200);
        });
    });
}

// Initialize glossary sidebar
createGlossarySidebar();

// ==============================
// SOURCES SIDEBAR FUNCTIONALITY
// ==============================

const sourcesBtn = document.getElementById('sources-btn');
const sourcesDropdown = document.getElementById('sources-dropdown');

// Create sources sidebar elements dynamically
function createSourcesSidebar() {
    // Create sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'sources-sidebar';
    
    // Get content from dropdown
    const dropdownContent = sourcesDropdown.innerHTML;
    
    // Build sidebar HTML - no header, no close button
    let sidebarHTML = `
        <div class="sidebar-content">
    `;
    
    // If there's content in the dropdown, process it
    if (dropdownContent.trim()) {
        // Parse and restructure the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = dropdownContent;
        
        // Process sources paragraphs based on current language
        // Default to German if isGerman is not yet defined
        const currentIsGermanSources = (typeof isGerman !== 'undefined') ? isGerman : true;
        const sourcesSelector = currentIsGermanSources ? '.sources' : '.sources-eng';
        const sourceItems = tempDiv.querySelectorAll(sourcesSelector);
        
        if (sourceItems.length > 0) {
            sourceItems.forEach((item) => {
                const ps = item.querySelectorAll('p');
                ps.forEach((p) => {
                    const text = p.textContent;
                    if (text && text.trim()) {
                        sidebarHTML += `
                            <div class="source-item">
                                <p>${text}</p>
                            </div>
                        `;
                    }
                });
            });
        } else {
            // Fallback: just get all paragraphs if no language-specific content found
            const sourceParagraphs = tempDiv.querySelectorAll('p');
            sourceParagraphs.forEach((p) => {
                const text = p.textContent;
                if (text && text.trim()) {
                    sidebarHTML += `
                        <div class="source-item">
                            <p>${text}</p>
                        </div>
                    `;
                }
            });
        }
        
        // Process each section (h2 and h3 elements)
        const h2Elements = tempDiv.querySelectorAll('.h2');
        h2Elements.forEach((h2) => {
            const text = h2.querySelector('p').textContent;
            sidebarHTML += `
                <div class="h2" data-section="${text}">
                    <p>${text}</p>
                </div>
            `;
            
            // Find following h3 elements (siblings until next h2)
            let nextElement = h2.nextElementSibling;
            while (nextElement && !nextElement.classList.contains('h2')) {
                if (nextElement.classList.contains('h3')) {
                    const h3Text = nextElement.querySelector('p').textContent;
                    sidebarHTML += `
                        <div class="h3" data-section="${h3Text}">
                            <p>${h3Text}</p>
                        </div>
                    `;
                }
                nextElement = nextElement.nextElementSibling;
            }
        });
    } else {
        // Empty state message
        sidebarHTML += `
            <div class="h2" style="padding: 16px; color: var(--white); opacity: 0.5;">
                <p>Sources content will be added soon...</p>
            </div>
        `;
    }
    
    sidebarHTML += '</div>';
    sidebar.innerHTML = sidebarHTML;
    document.body.appendChild(sidebar);
    
    // Add event listeners
    // Reuse overlay from index sidebar
    const overlayEl = document.getElementById('sidebar-overlay');
    
    // Close sidebar functions
    function closeSourcesSidebar() {
        sidebar.classList.remove('open');
        overlayEl.classList.remove('visible');
        document.body.classList.remove('sidebar-open');
    }
    
    function openSourcesSidebar() {
        sidebar.classList.add('open');
        overlayEl.classList.add('visible');
        document.body.classList.add('sidebar-open');
    }
    
    // Toggle sidebar
    sourcesBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            closeSourcesSidebar();
        } else {
            openSourcesSidebar();
        }
    });
    
    // Close on overlay click
    overlayEl.addEventListener('click', () => {
        closeSourcesSidebar();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSourcesSidebar();
        }
    });
    
    // Handle sidebar item clicks - scroll to section
    sidebar.querySelectorAll('.h2, .h3').forEach(item => {
        item.addEventListener('click', () => {
            const sectionText = item.getAttribute('data-section');
            // Find matching content in reading area
            const contentElements = document.querySelectorAll('#reading-area .h2 p, #reading-area .h3 p');
            let found = false;
            contentElements.forEach(el => {
                if (!found && el.textContent.trim() === sectionText.trim()) {
                    const parent = el.closest('.h2, .h3');
                    if (parent) {
                        // Scroll with offset so title is visible
                        const navHeight = 80;
                        const blockTop = parent.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: blockTop - navHeight,
                            behavior: "smooth"
                        });
                        // Highlight the section immediately
                        highlightSection(parent);
                        setTimeout(syncLineNumberScroll, 300);
                        found = true;
                    }
                }
            });
            // Close sidebar after selection
            setTimeout(closeSourcesSidebar, 200);
        });
    });
}

// Initialize sources sidebar
createSourcesSidebar();

// ==============================
// SCROLL HIGHLIGHT FUNCTIONALITY
// ==============================

// Function to highlight a specific section
function highlightSection(targetElement) {
    // Remove active-section class from all h2/h3 in reading area
    document.querySelectorAll('#reading-area .h2, #reading-area .h3').forEach(el => {
        el.classList.remove('active-section');
    });
    
    // Add active-section class to target
    if (targetElement) {
        targetElement.classList.add('active-section');
    }
}

// Function to find the current visible section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('#reading-area .h2, #reading-area .h3');
    const navHeight = 100; // Account for fixed nav
    
    let currentSection = null;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if the section is near the top of the viewport
        if (rect.top <= navHeight && rect.bottom > navHeight) {
            currentSection = section;
        }
    });
    
    // If no section is exactly at the top, find the last section that passed the top
    if (!currentSection) {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= navHeight) {
                currentSection = section;
            }
        });
    }
    
    return currentSection;
}

// Update highlight on scroll
function updateScrollHighlight() {
    const currentSection = getCurrentSection();
    if (currentSection) {
        highlightSection(currentSection);
    }
}

// Add scroll event listener with debounce
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(updateScrollHighlight);
});

// Also update on page load
updateScrollHighlight();

// ================================
// GLOBAL STATE
// ================================

let scrollSpeed = 29.7;


// ================================
// DOM READY
// ================================

document.addEventListener('DOMContentLoaded', function () {

    // Language toggle button functionality
    const langBtn = document.getElementById('lang-btn');
    const glossaryBtn = document.getElementById('glossary-btn');
    const sourcesBtn = document.getElementById('sources-btn');
    const downloadBtn = document.getElementById('download-btn');
    let isGerman = false; // Default is English
    
    function updateLanguageVisibility() {
        // Update body class for CSS-based language switching
        document.body.classList.remove('english-mode', 'german-mode');
        document.body.classList.add(isGerman ? 'german-mode' : 'english-mode');
        
        // Show/hide English elements (with -eng suffix)
        document.querySelectorAll('[class$="-eng"]').forEach(el => {
            el.style.display = isGerman ? 'none' : 'block';
        });
        
        // Show/hide German elements (without -eng suffix, but only content elements)
        document.querySelectorAll('.h1, .h2, .h3, .h4, .scrolling-text, .scrolling-text-italic, .glossar').forEach(el => {
            if (!el.classList.contains('eng')) {
                el.style.display = isGerman ? 'block' : 'none';
            }
        });
        
        // Update button labels
        if (glossaryBtn) {
            glossaryBtn.textContent = isGerman ? 'glossar' : 'glossary';
        }
        if (sourcesBtn) {
            sourcesBtn.textContent = isGerman ? 'quellen' : 'sources';
        }
        
        // Recreate glossary and sources sidebars with correct language
        const existingGlossarySidebar = document.getElementById('glossary-sidebar');
        if (existingGlossarySidebar) {
            existingGlossarySidebar.remove();
            createGlossarySidebar();
        }
        const existingSourcesSidebar = document.getElementById('sources-sidebar');
        if (existingSourcesSidebar) {
            existingSourcesSidebar.remove();
            createSourcesSidebar();
        }
        
        // Also recreate index sidebar when language changes
        const existingIndexSidebar = document.getElementById('index-sidebar');
        if (existingIndexSidebar) {
            existingIndexSidebar.remove();
            createSidebar();
        }
    }
    
    if (langBtn) {
        langBtn.textContent = 'german'; // Show German option when in English mode
        
        // Initialize visibility on page load
        updateLanguageVisibility();
        
        langBtn.addEventListener('click', function() {
            isGerman = !isGerman;
            langBtn.textContent = isGerman ? 'english' : 'german';
            updateLanguageVisibility();
        });
    }
    
    // Glossary reference click handler - open glossary sidebar
    const glossaryRefs = document.querySelectorAll('.glossary-ref');
    glossaryRefs.forEach(ref => {
        ref.addEventListener('click', function() {
            // Find the glossary button and trigger click to open sidebar
            const glossaryBtn = document.getElementById('glossary-btn');
            if (glossaryBtn) {
                glossaryBtn.click();
            }
        });
    });
    
    // Glossary reference English click handler - open glossary sidebar
    const glossaryRefsEng = document.querySelectorAll('.glossary-ref-eng');
    glossaryRefsEng.forEach(ref => {
        ref.addEventListener('click', function() {
            // Find the glossary button and trigger click to open sidebar
            const glossaryBtn = document.getElementById('glossary-btn');
            if (glossaryBtn) {
                glossaryBtn.click();
            }
        });
    });
    
    // Popup close button functionality
    const popupTip = document.getElementById('popup-tip');
    const popupClose = document.getElementById('popup-close');
    
    if (popupClose && popupTip) {
        popupClose.addEventListener('click', function() {
            popupTip.style.display = 'none';
        });
        
        // Make popup draggable
        let popupOffsetX, popupOffsetY;
        
        popupTip.addEventListener('mousedown', e => {
            if (e.target.classList.contains('popup-close')) return;
            popupOffsetX = e.clientX - popupTip.offsetLeft;
            popupOffsetY = e.clientY - popupTip.offsetTop;
            popupTip.style.cursor = 'grabbing';
            
            function onMouseMove(e) {
                popupTip.style.left = `${e.clientX - popupOffsetX}px`;
                popupTip.style.top = `${e.clientY - popupOffsetY}px`;
            }
            
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                popupTip.style.cursor = 'grab';
            }
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    // Scroll to top on page load to show the start of the text
    window.scrollTo(0, 0);
    
    // Add a small delay then scroll to show "1. Einleitung" in viewport
    setTimeout(() => {
        const einleitung = document.querySelector('#reading-area .h2');
        if (einleitung) {
            const navHeight = 200; // Account for nav height
            const blockTop = einleitung.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: blockTop - navHeight,
                behavior: 'auto'
            });
        }
    }, 100);
    
    // Ensure line numbers are also at the top
    const lineNumbersContainer = document.querySelector('.line-numbers');
    if (lineNumbersContainer) {
        lineNumbersContainer.scrollTop = 0;
    }
    
    const playPauseBtn = document.getElementById('play-pause-btn');
    const audio = document.getElementById('background-audio');

    const volumeSlider = document.getElementById("volumeSlider");
    const volumeValue  = document.getElementById("volumeValue");

    const scrollSpeedSlider = document.getElementById("scrollSpeedSlider");
    const scrollSpeedValue  = document.getElementById("scrollSpeedValue");

    const fontSizeSlider = document.getElementById("fontSizeSlider");
    const fontSizeValue  = document.getElementById("fontSizeValue");

    const fontWeightSlider = document.getElementById("fontWeightSlider");
    const fontWeightValue  = document.getElementById("fontWeightValue");

    let isScrolling = false;
    let scrollRAF = null;
    let lastTime = null;


    // ================================
    // AUTO SCROLL
    // ================================

    function autoScroll(timestamp) {
        if (!isScrolling) return;

        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        lastTime = timestamp;

        const step = (scrollSpeed * delta) / 1000;
        window.scrollBy(0, step);

        // Prüfe nur alle paar Frames, ob das Ende erreicht wurde
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            isScrolling = false;
            playPauseBtn.textContent = '▶';
            audio.pause();
            cancelAnimationFrame(scrollRAF);
            return;
        }

        scrollRAF = requestAnimationFrame(autoScroll);
    }


    // ================================
    // PLAY / PAUSE
    // ================================

    playPauseBtn.addEventListener('click', () => {
        if (isScrolling) {
            isScrolling = false;
            playPauseBtn.textContent = '▶';
            audio.pause();
            cancelAnimationFrame(scrollRAF);
        } else {
            isScrolling = true;
            playPauseBtn.textContent = '⏸';
            audio.play();
            lastTime = null;
            scrollRAF = requestAnimationFrame(autoScroll);
        }
    });

    // ================================
    // VOLUME SLIDER
    // ================================

    audio.volume = volumeSlider.value;
    volumeValue.textContent = `${Math.round(volumeSlider.value * 100)}%`;

    volumeSlider.addEventListener("input", (e) => {
        const vol = e.target.value;
        audio.volume = vol;
        volumeValue.textContent = `${Math.round(vol * 100)}%`;
    });

    // ================================
    // SCROLL SPEED (TRIG)
    // ================================

    function mapSpeed(v) {
    const min = 27;    // px/s – immer sichtbar
    const max = 30;   // max speed
    const t = v / 100;

    return min + Math.pow(t, 1.6) * (max - min);
    }

    function updateScrollSpeed(value) {
        scrollSpeed = mapSpeed(Number(value));
        scrollSpeedValue.textContent = `+${value}`;
    }

    updateScrollSpeed(scrollSpeedSlider.value);

    scrollSpeedSlider.addEventListener("input", (e) => {
        updateScrollSpeed(e.target.value);
    });

    // ================================
    // FONT SIZE (CONTENT ONLY!)
    // ================================

    function updateFontSize(px) {
        const readingArea = document.getElementById("reading-area");

        const lineHeightFactor = px < 15 ? 1.45 :
                                px < 18 ? 1.55 :
                                1.65;

        readingArea.style.setProperty("--base-font-size", `${px}px`);
        readingArea.style.setProperty("--base-line-height", lineHeightFactor);

        fontSizeValue.textContent = `${px} pt`;

        // Nur neu berechnen, wenn nötig
        if (px !== Number(fontSizeSlider.value)) {
            setTimeout(generateLineNumbers, 50);
        }
    }

    updateFontSize(fontSizeSlider.value);

    fontSizeSlider.addEventListener("input", (e) => {
        updateFontSize(e.target.value);
    });

        function updateFontSize(px) {
    const readingArea = document.getElementById("reading-area");

    // typografischer Faktor
    const lineHeightFactor = 1.6;

    readingArea.style.setProperty("--base-font-size", `${px}px`);
    readingArea.style.setProperty("--base-line-height", lineHeightFactor);

    fontSizeValue.textContent = `${px} pt`;
    }

        function updateFontSize(px) {
    const readingArea = document.getElementById("reading-area");

    // dynamischer Faktor
    const lineHeightFactor = px < 15 ? 1.45 :
                            px < 18 ? 1.55 :
                            1.65;

    readingArea.style.setProperty("--base-font-size", `${px}px`);
    readingArea.style.setProperty("--base-line-height", lineHeightFactor);

    fontSizeValue.textContent = `${px} pt`;
    }

    // ================================
    // FONT WEIGHT
    // ================================

    const textSelectors = [
        ".h1",
        ".h2",
        ".h3",
        ".h4",
        ".scrolling-text",
        ".scrolling-text-italic"
    ];

    function updateFontWeight(weight) {
        fontWeightValue.textContent = weight;
        textSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.fontWeight = weight;
            });
        });
    }

    updateFontWeight(fontWeightSlider.value);

    fontWeightSlider.addEventListener("input", (e) => {
        updateFontWeight(e.target.value);
    });

    document.querySelectorAll('.draggable').forEach(el => {
    const handles = el.querySelectorAll('.resize-handle');
    let offsetX, offsetY, startX, startY, startWidth, startHeight;

    // Aktivklasse setzen
    el.addEventListener('mousedown', e => {
        document.querySelectorAll('.draggable').forEach(d => d.classList.remove('active'));
        el.classList.add('active');
    });

    // Drag
    el.addEventListener('mousedown', e => {
    if ([...handles].includes(e.target)) return;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.cursor = 'grabbing';

    function onMouseMove(e) {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      el.style.cursor = 'grab';
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

    // Resize proportional je Ecke
    handles.forEach(handle => {
        handle.addEventListener('mousedown', e => {
        e.stopPropagation();
        startX = e.clientX;
        startY = e.clientY;
        startWidth = el.offsetWidth;
        startHeight = el.offsetHeight;
        const rectStartLeft = el.offsetLeft;
        const rectStartTop = el.offsetTop;

        function onMouseMove(e) {
            let dx = e.clientX - startX;
            let dy = e.clientY - startY;
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = rectStartLeft;
            let newTop = rectStartTop;

            if (handle.classList.contains('handle-se')) {
            newWidth = startWidth + dx;
            newHeight = startHeight + dy;
            } else if (handle.classList.contains('handle-sw')) {
            newWidth = startWidth - dx;
            newHeight = startHeight + dy;
            newLeft = rectStartLeft + dx;
            } else if (handle.classList.contains('handle-ne')) {
            newWidth = startWidth + dx;
            newHeight = startHeight - dy;
            newTop = rectStartTop + dy;
            } else if (handle.classList.contains('handle-nw')) {
            newWidth = startWidth - dx;
            newHeight = startHeight - dy;
            newLeft = rectStartLeft + dx;
            newTop = rectStartTop + dy;
            }

            // Minimumgröße
            newWidth = Math.max(30, newWidth);
            newHeight = Math.max(30, newHeight);

            el.style.width = newWidth + 'px';
            el.style.height = newHeight + 'px';
            el.style.left = newLeft + 'px';
            el.style.top = newTop + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        });
    });
    });

        document.querySelectorAll('.draggable').forEach(el => {
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let dragging = false;
    let lockAxis = null;

    el.addEventListener('mousedown', e => {
        if (e.target.classList.contains('resize-handle')) return;

        dragging = true;
        lockAxis = null;
        startX = e.clientX - targetX;
        startY = e.clientY - targetY;
        el.classList.add('active');
    });

    document.addEventListener('mousemove', e => {
        if (!dragging) return;

        let dx = e.clientX - startX;
        let dy = e.clientY - startY;

        // SHIFT = axis lock
        if (e.shiftKey) {
        if (!lockAxis) {
            lockAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        }
        if (lockAxis === 'x') dy = targetY;
        if (lockAxis === 'y') dx = targetX;
        } else {
        lockAxis = null;
        }

        targetX = dx;
        targetY = dy;
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
        el.classList.remove('active');
    });

    function animate() {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
        requestAnimationFrame(animate);
    }

    animate();
    });

    // ==============================

    // ================================
    // WRAP CONTENT FOR LINE NUMBERING
    // ================================

    function wrapContentForLineNumbers() {
        // Get all content elements that should have line numbers
        const contentSelectors = [
            '.h1', '.h2', '.h3', '.h4',
            '.scrolling-text', '.scrolling-text-italic'
        ];
        
        const container = document.querySelector('#reading-area');
        
        // Create a wrapper for all content with line numbers
        let allContent = [];
        
        contentSelectors.forEach(selector => {
            document.querySelectorAll(`#reading-area ${selector}`).forEach((el, idx) => {
                // Skip the h1 (main title) since it's now displayed in the nav
                if (el.classList.contains('h1')) {
                    return;
                }
                el.classList.add('content-block');
                el.dataset.blockIndex = allContent.length;
                allContent.push(el);
            });
        });
        
        // Generate line numbers based on content blocks
        generateLineNumbers();
    }

    wrapContentForLineNumbers();

    // ================================
    // LINE NUMBER GENERATION
    // ================================

    function generateLineNumbers() {
        const container = document.querySelector(".line-numbers");
        container.innerHTML = "";

        // Get all content blocks
        const blocks = document.querySelectorAll('.content-block');

        blocks.forEach((block, index) => {
            const number = document.createElement("span");
            number.classList.add("line-number");
            number.textContent = index + 1;

            number.addEventListener("click", () => {
                // Find the next h2 or h3 after the current block
                const allHeadings = document.querySelectorAll('#reading-area .h2, #reading-area .h3');
                let targetHeading = null;
                
                // Get the current block's position
                const currentBlockTop = block.getBoundingClientRect().top + window.pageYOffset;
                
                // Find the first h2 or h3 that is at or after the current block
                for (const heading of allHeadings) {
                    const headingTop = heading.getBoundingClientRect().top + window.pageYOffset;
                    if (headingTop >= currentBlockTop - 10) { // -10 to account for small differences
                        targetHeading = heading;
                        break;
                    }
                }
                
                // If no heading found after current block, use the current block if it's an h2 or h3
                if (!targetHeading) {
                    if (block.classList.contains('h2') || block.classList.contains('h3')) {
                        targetHeading = block;
                    } else {
                        // Find the next h2 or h3 anywhere
                        targetHeading = document.querySelector('#reading-area .h2, #reading-area .h3');
                    }
                }
                
                if (targetHeading) {
                    // Scroll with offset so title is visible
                    const navHeight = 80; // Account for nav height
                    const blockTop = targetHeading.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: blockTop - navHeight,
                        behavior: "smooth"
                    });
                    setTimeout(syncLineNumberScroll, 300);
                }
            });

            container.appendChild(number);
        });

        syncLineNumberScroll();
    }

    // ================================
    // PROPORTIONAL SCROLL SYNC
    // ================================

    function syncLineNumberScroll() {

        const container = document.querySelector(".line-numbers");

        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const numbersHeight =
            container.scrollHeight - container.clientHeight;

        if (pageHeight <= 0) return;

        const ratio = window.scrollY / pageHeight;

        container.scrollTop = ratio * numbersHeight;
    }

    window.addEventListener("scroll", syncLineNumberScroll);
    window.addEventListener("resize", generateLineNumbers);


    // ================================
    // FONT SIZE FIX
    // ================================

    // WICHTIG: deine updateFontSize Funktion ersetzen durch DIESE eine:

    function updateFontSize(px) {

        const readingArea = document.getElementById("reading-area");

        const lineHeightFactor =
            px < 15 ? 1.45 :
            px < 18 ? 1.55 :
            1.65;

        readingArea.style.setProperty("--base-font-size", `${px}px`);
        readingArea.style.setProperty("--base-line-height", lineHeightFactor);

        fontSizeValue.textContent = `${px} pt`;

        // 🔥 nach Font-Änderung neu berechnen
        setTimeout(generateLineNumbers, 50);
    }

});

