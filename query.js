const doc = document;
/**
 * @param {Date} date
 */
function daysSince(date) {
    return Math.floor((new Date() - date) / (24 * 60 * 60 * 1000));
}

const GRMN1020_CurrentModule = {
    getURL() {
        let weekNum = Math.floor(daysSince(new Date(2023, 0, 8, 0, 0)) / 7);
        let panelNum = this.getPanelNum();
        
        return `https://canvas.colorado.edu/courses/90354/pages/week-${weekNum}-overview#kl_panel_${panelNum}_content`;
    },
    getPanelNum() {
        let day = new Date().getDay() - 1;
        return Math.min(Math.max(day - (day > 2), 0), 3);
    }
}

const CSCI2270_CurrentAssignmentRepo = {
    getURL() {
        let weekNum = Math.floor(daysSince(new Date(2023, 0, 16, 0, 0)) / 7);
        weekNum -= (weekNum > 6) + (weekNum > 10);
        
        return `https://github.com/cu-csci-2270-spring-2023/assignment-${weekNum}-nathan-getz`;
    }
}

const CSCI2270_CurrentRecitationRepo = {
    getURL() {
        let weekNum = Math.floor(daysSince(new Date(2023, 0, 16, 0, 0)) / 7);
        weekNum -= (weekNum > 6) + (weekNum > 10);

        return `https://github.com/cu-csci-2270-spring-2023/recitation-${++weekNum}-nathan-getz`
    }
}

const urlParams = new URL(window.location.toLocaleString()).searchParams;
const id = urlParams.get("id").toString();

/**
 * @param {String} id
 */
function getUrl(id) {
    if (id == "grmn1020") return GRMN1020_CurrentModule.getURL();
    if (id == "csci2270_a") return CSCI2270_CurrentAssignmentRepo.getURL();
    if (id == "csci2270_r") return CSCI2270_CurrentRecitationRepo.getURL();

    return id;
}

/**
 * @param {String} id 
 */
function redirect(id) {
    let url = getUrl(id);
    if (url == id) return false;

    let meta = doc.createElement("meta");
    meta.httpEquiv = "Refresh";
    meta.content = "1; url=" + url;
    doc.head.appendChild(meta);

    return true;
}

redirect(id);
