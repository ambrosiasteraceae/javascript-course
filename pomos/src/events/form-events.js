
export function sendDataEvent(fm, app){
    fm.form.addEventListener("submit", (event) => {
    event.preventDefault();
    fm.sendData(app);
})}
