const $btnSub = document.querySelector('#btn-sub');
const $selectOpt = document.querySelector('#langs');
const $textAr = document.querySelector('#txt_translate');
const dataDiv = document.querySelector('#data-content');
$btnSub.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.setAttribute('disabled','disabled');
    dataDiv.textContent = 'Loading...';

    const selOption = $selectOpt.options[$selectOpt.selectedIndex].value;

    makeReq(selOption, $textAr.value)
        .then((data) => {
            e.target.removeAttribute('disabled');
            if(data.text && data.lang ) {
                dataDiv.innerHTML = data.lang + '<br />' + data.text + '<br />';
            }
            else {
                dataDiv.textContent = "Error catching data";
            }
            console.log(data);
        })
        .catch((err) => {
            e.target.removeAttribute('disabled');
            dataDiv.textContent = err.Error;
            console.log(err);
        });
})

const makeReq = async (target_ln, text) => {
    try{
        const response = await fetch('/send/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,
                target_ln
            })
        });
        if(response.status !== 200) {
            throw new Error("Error catching data");
        }
        const data = await response.json();
        return data;
    }
    catch(e) {
        return e;
    }
}