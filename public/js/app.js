const $btnSub = document.querySelector('#btn-sub');
const $selectOpt = document.querySelector('#langs');
const $textAr = document.querySelector('#txt_translate');

const dataDiv = document.querySelector('#data-main-content');
const header = document.querySelector('.header');
const fdiv = document.querySelector('.fdiv');
const dataP = document.querySelector('.p-content');

$btnSub.addEventListener('click', (e) => {
    e.preventDefault();

    if(!$textAr.value.trim()) {
        $textAr.value = '';
        $textAr.focus();
        return alert('You didn\'t write any text.');
    }

    if($textAr.value.trim().includes('#')) {
        $textAr.focus();
        return alert('Character "#" is not allowed.');
    }

    dataP.setAttribute('style','display:none');
    e.target.setAttribute('disabled','disabled');
    dataDiv.innerHTML = 'Loading...';

    const selOption = $selectOpt.options[$selectOpt.selectedIndex].value;

    makeReq(selOption, $textAr.value.trim())
        .then((data) => {
            e.target.removeAttribute('disabled');

            if(data.text && data.lang ) {
                dataP.setAttribute('style','display');
                dataDiv.innerHTML = data.text;
            }
            else {
                dataDiv.textContent = "Error catching data";
            }

            dataDiv.removeAttribute('style');

            window.scroll({
             top: header.offsetHeight + fdiv.offsetHeight - dataDiv.offsetHeight,
             behavior: 'smooth'
            });
        })
        .catch((err) => {
            e.target.removeAttribute('disabled');
            dataDiv.textContent = err.Error;

            window.scroll({
                top: header.offsetHeight + fdiv.offsetHeight - dataDiv.offsetHeight,
                behavior: 'smooth'
               });

            dataDiv.removeAttribute('style');
            
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