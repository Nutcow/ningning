(function initPdfViewer() {
    const PDF_STATE_KEY = 'win10_pdf_state';
    const TOTAL_PAGES = 4;
    let pdfCurrentPage = 1;
    let pdfCurrentZoom = 100;
 
    function pdfSaveState() {
        localStorage.setItem(PDF_STATE_KEY, JSON.stringify({
            page: pdfCurrentPage,
            zoom: pdfCurrentZoom
        }));
    }
 
    function pdfRestoreState() {
        try {
            const s = JSON.parse(localStorage.getItem(PDF_STATE_KEY));
            if (s) {
                pdfCurrentPage = s.page || 1;
                pdfCurrentZoom = s.zoom || 100;
            }
        } catch(e) {}
        pdfApplyPage();
        pdfApplyZoom();
    }
 
    window.pdfGoToPage = function(n) {
        n = Math.max(1, Math.min(TOTAL_PAGES, parseInt(n) || 1));
        pdfCurrentPage = n;
        pdfApplyPage();
        pdfSaveState();
    };
 
    window.pdfChangePage = function(delta) {
        pdfGoToPage(pdfCurrentPage + delta);
    };
 
    window.pdfJumpToPage = function(val) {
        pdfGoToPage(val);
    };
 
    function pdfApplyPage() {
        for (let i = 1; i <= TOTAL_PAGES; i++) {
            const pg = document.getElementById(`pdf-pg-${i}`);
            const th = document.getElementById(`pdf-thumb-${i}`);
            if (!pg || !th) continue;
 
            if (i === pdfCurrentPage) {
                pg.style.display = 'block';
                th.style.borderColor = '#0078d7';
            } else {
                pg.style.display = 'none';
                th.style.borderColor = 'transparent';
            }
        }
 
        const pageInput = document.getElementById('pdf-page-input');
        if (pageInput) pageInput.value = pdfCurrentPage;
 
        const statusPage = document.getElementById('pdf-status-page');
        if (statusPage) statusPage.textContent = `第 ${pdfCurrentPage} / ${TOTAL_PAGES} 页`;

        const activeThumb = document.getElementById(`pdf-thumb-${pdfCurrentPage}`);
        if (activeThumb) activeThumb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
 
    window.pdfChangeZoom = function(delta) {
        pdfCurrentZoom = Math.max(50, Math.min(200, pdfCurrentZoom + delta));
        pdfApplyZoom();
        pdfSaveState();
    };
 
    window.pdfFitWidth = function() {
        pdfCurrentZoom = 100;
        pdfApplyZoom();
        pdfSaveState();
    };
 
    function pdfApplyZoom() {
        const pages = document.querySelectorAll('.pdf-page-el');
        const baseW = 595;
        const scale = pdfCurrentZoom / 100;
        pages.forEach(pg => { pg.style.width = (baseW * scale) + 'px'; });
 
        const zoomLabel = document.getElementById('pdf-zoom-label');
        if (zoomLabel) zoomLabel.textContent = pdfCurrentZoom + '%';
        const statusZoom = document.getElementById('pdf-status-zoom');
        if (statusZoom) statusZoom.textContent = pdfCurrentZoom + '%';
    }

    document.addEventListener('keydown', (e) => {
        const pdfWin = document.getElementById('win-pdfviewer');
        if (!pdfWin || pdfWin.style.display === 'none') return;
        if (['ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); pdfChangePage(1); }
        if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); pdfChangePage(-1); }
    });

    function tryInit() {
        const pg1 = document.getElementById('pdf-pg-1');
        if (!pg1) { setTimeout(tryInit, 300); return; }
        pdfRestoreState();
    }
 
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();
