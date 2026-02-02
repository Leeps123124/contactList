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

// все дальше работа с кнопками (сейчас консоль)

function addCont(name, phone, vacnacy) { 

    const deleteName = name.trim();
    const deletePhone = phone.trim();
    const deleteVanacy = vacnacy.trim();

    if (deleteName === "") { 
        console.log("Error: name out")
        return;
    }
    if (deletePhone === "") { 
        console.log("Error: phone out")
        return;
    }
    if (deleteVanacy === "") { 
        console.log("Error: vacancy out")
        return;
    }



    const newCont = { 
         id: Date.now(),
        name: deleteName,
        phone: deletePhone,
        vacnacy: deleteVanacy
    };

    contacts.push(newCont);

    saveCont();
}

    function clearAll(){
        contacts = [];
        saveCont();
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
    const err = document.querySelector('.err');

    function rnd() { 
        list.innerHTML = "";

        if ( contacts.length === 0 ) { 
            list.textContent = 'Sos1 huy =)))';
            return;
        }

        for(const cont of contacts) { 

            const item = document.createElement('div');
            item.textContent = `${cont.name} - ${cont.phone} - ${cont.vacnacy}`;

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';

            delBtn.addEventListener('click' , () => {
                deleteCont(cont.id);
                rnd();
            });

            item.appendChild(delBtn);
            list.appendChild(item);
        }
    }

    addBtn.addEventListener('click', () => {
        err.textContent = "";

        const name = nameInp.value;
        const phone = phoneInp.value;
        const vacancy = vacancyInp.value;

        const adds = addCont(name, phone, vacancy);

        if ( 
            adds === false
        ) { 
            err.textContent = 'zalupa';
            return;
        }


        nameInp.value = '';
        phoneInp.value = '';
        vacancyInp.value = '';

        rnd();
    });

    clearAllBtn.addEventListener('click', () => {
        clearAll();
        rnd();
    })
    rnd();










