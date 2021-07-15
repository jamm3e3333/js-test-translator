const $btnSub = document.querySelector('#btn-sub');
const $selectOpt = document.querySelector('#langs');
const $textAr = document.querySelector('#txt_translate');
const dataDiv = document.querySelector('#data-content');
const header = document.querySelector('.header');
const fdiv = document.querySelector('.fdiv');

$btnSub.addEventListener('click', (e) => {
    e.preventDefault();
    if(!$textAr.value.trim()) {
        $textAr.value = '';
        $textAr.focus();
        return alert('You didn\'t write any text.');
    }
    e.target.setAttribute('disabled','disabled');
    dataDiv.textContent = 'Loading...';

    const selOption = $selectOpt.options[$selectOpt.selectedIndex].value;

    makeReq(selOption, $textAr.value.trim())
        .then((data) => {
            e.target.removeAttribute('disabled');
            if(data.text && data.lang ) {
                dataDiv.innerHTML = `<p>Translated text:</p> ${data.text}`;
            }
            else {
                dataDiv.textContent = "Error catching data";
            };
            window.scroll({
             top: header.offsetHeight + fdiv.offsetHeight - dataDiv.offsetHeight,
             behavior: 'smooth'
            });
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