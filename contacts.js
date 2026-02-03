"use strict";


const key = "contacts";

let contacts = []; 
const savedLocal = localStorage.getItem(key);

if (savedLocal) {
    contacts = JSON.parse(savedLocal);
} else {
    contacts = [];
}



function saveCont() { 

    localStorage.setItem(key, JSON.stringify(contacts)); // сохраняем что бы не писать каждый раз одно и тоже
}

function normPh(ph) { 
    return ph.replace(/\D/g, "");
}

function vldPhn(phL) {
    return phL.length >= 7 && phL.length <= 15;
}

function vldNm(nm) { 
    return /^[A-Za-zА-Яа-яЁё\s-]{2,40}$/.test(nm);
}

function vldVc(vc) { 
    return vc.length >= 2 && vc.length <= 50;
}




// все дальше работа с кнопками уже рендерится 

function addCont(name, phone, vacnacy) {

    const clName = name.trim();
    const clPhone = phone.trim();
    const clVacancy = vacnacy.trim();

// пустые если 

    if (clName === "") { 
        return false;
    }
    if (clPhone === "") { 
        return false;
    } 
    if (clVacancy === "") { 
        return false;
    }

// валидация имя/работа

    if (!vldNm(clName)) { 
        return false;
    }

    if (!vldVc(clVacancy)) { 
        return false;
    }

const phPlusNm = normPh(clPhone); // ток цифры 
    if (!vldPhn(phPlusNm)) { 
        return false;
} 

const ex = contacts.some((e) => e.phPlusNm === phPlusNm) 
    if (ex) { 
        return false;
    }





    const newCont = { 
        id: Date.now(),
        name: clName,
        phone: clPhone,
        vacnacy: clVacancy,
        phPlusNm: phPlusNm
    };

    contacts.push(newCont);
    saveCont();
    return true;
}

    function clearAll(){
        contacts = [];
        saveCont();
        return true;
    }
    function deleteCont(id) { 
        contacts = contacts.filter((cont) => cont.id !== id);
        saveCont();
    }

    const nameInp = document.querySelector('.inpNm');
    const phoneInp = document.querySelector('.inptPhn');
    const vacancyInp = document.querySelector('.inptVac');
    const addBtn = document.querySelector('.btnAdd');
    const clearAllBtn = document.querySelector('.btnDelete');
    const list =  document.querySelector('.list');
    const alph = document.querySelector('.aplhavit')
    const err = document.querySelector('.err');


    const APLHAVITES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


    function getAplh(name) { 
        const a = (name ?? "").trim();

        if (!a) {
            return "#";
        }
        const first = a[0].toUpperCase();

        if (/^[A-Z]$/.test(first)) {
            return first;
        }
        return "#";
    }

    function getFirstAlph() { 
        
        alph.innerHTML = "";


        const count = {};
        for (const a of APLHAVITES) count[a] = 0; 
        count["#"] = 0;

        for (const c of contacts) {
            const l = getAplh(c.name);
            count[l] = (count[l] ?? 0) + 1;
        }
        for (const c of APLHAVITES) { 
            const btn = document.createElement("button");
            btn.textContent = `${c} (${count[c]})`;
            alph.appendChild(btn);
         }

         const cache = document.createElement("button");
         cache.textContent = `# (${count["#"]})`;
         alph.appendChild(cache);

    }





    function rnd() { 
        list.innerHTML = "";

        if ( contacts.length === 0 ) { 
            list.textContent = 'type some one contact';
            getFirstAlph();
        }

        for(const cont of contacts) { 

            const item = document.createElement('div');
            item.textContent = `${cont.name} -  ${cont.vacnacy} - ${cont.phone}`;

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';

            delBtn.addEventListener('click' , () => {
                deleteCont(cont.id);
                rnd();
            });

            item.appendChild(delBtn);
            list.appendChild(item);
        }
        getFirstAlph();
    }


    addBtn.addEventListener('click', () => {
        err.textContent = "";

        const name = nameInp.value;
        const phone = phoneInp.value;
        const vacancy = vacancyInp.value;

        const adds = addCont(name, phone, vacancy);
        nameInp.value = '';
        phoneInp.value = '';
        vacancyInp.value = '';

        rnd();
        return true;
       
    });

    clearAllBtn.addEventListener('click', () => {
        clearAll();
        rnd();
    })
    rnd();













