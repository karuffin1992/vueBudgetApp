/////////////////////////////
// Budget Controller
var budgetController = (function(){
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    
    Expense.prototype.calcPerc = function(totalInc) {
        if(totalInc > 0) {
            this.percentage = Math.round((this.value / totalInc) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPerc = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type) {
        var sum = 0;

        data.allItems[type].forEach(function(curr, i, array){
            sum += curr.value;
        });

        data.totals[type] = sum;
    }

    return {
        addItem: function(type, desc, val) {
            var newItem, id;
            
            // Create new ID
            if(data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp') {
                newItem = new Expense(id, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(id, desc, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },
        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate budget: income - expenses
            data.budget = data.totals['inc'] - data.totals['exp'];

            // calculate the percentage of income spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals['exp'] / data.totals['inc']) * 100);
            } else {
                data.percentage = -1;
            }
        },
        calculatePercentges: function() {
            data.allItems.exp.forEach(function(curr){
                curr.calcPerc(data.totals.inc);
            });
        },
        getPercentages: function() {
            var allPercs = data.allItems.exp.map(function(curr){
                return curr.getPerc();
            });
            return allPercs;
        },
        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        getBudget: function() {
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        testing: function() {
            console.log(data);
        }
    }
})();

/////////////////////////////
// UI Controller
var uiController = (function(){
    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        var numSplit, int, dec, sign;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        dec = numSplit[1];

        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
    }

    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(domStrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(domStrings.inputDescription).value,
                value: parseFloat(document.querySelector(domStrings.inputValue).value)
            }
            
        },
        addListItem: function(obj, type) {
            var html, newHTML, element;

            // Create html string with placeholder text
            if(type === 'inc') {
                element = domStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                element = domStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace placeholder text with data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
            
            // Insert the html into dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        deleteListItem: function(selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },
        clearFields: function() {
            var fields, fieldsArray;

            fields = document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue);
        
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array){
                current.value = '';
            });

            fieldsArray[0].focus();
        },
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(domStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(domStrings.expenseLabel).textContent = obj.totalExp;
            
            if(obj.percentage > 0) {
                document.querySelector(domStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(domStrings.percentageLabel).textContent = '---';
            }
        },
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(domStrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = percentages[index] + '---';
                }
            });
        },
        displayDate: function(){
            var now, year, month, months;
            
            months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
            
            now = new Date();

            year = now.getFullYear();
            month = months[now.getMonth()];

            document.querySelector(domStrings.dateLabel).textContent = month + ' ' + year;
        },
        changeType: function(){
            var fields = document.querySelectorAll(
                domStrings.inputType + ',' + 
                domStrings.inputDescription + ',' +
                domStrings.inputValue
            );

            nodeListForEach(fields, function(curr){
                curr.classList.toggle('red-focus');
            });

            document.querySelector(domStrings.inputBtn).classList.toggle('red');
        },
        getDOMStrings: function() {
            return domStrings;
        }
    }
})();

/////////////////////////////
// Global App Controller
var controller = (function(budgetCtrl, uiCtrl) {
    var setupEventListeners = function() {
        var DOM = uiCtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changeType);
    }

    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        uiCtrl.displayBudget(budget);
    }

    var updatePercentages = function(){
        // 1. calc percentages
        budgetCtrl.calculatePercentges();

        // 2. read percs from the budger ctrl
        var percentages = budgetCtrl.getPercentages();

        // 3. update UX with new percs
        uiCtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the filled input data
        input = uiCtrl.getInput();

        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget calculator
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            uiCtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            uiCtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percs
            updatePercentages();
        }
    }

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, id;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {
            //inc-%id% or exp-%id%
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            // 1. delete item from data structure
            budgetCtrl.deleteItem(type, id);

            // 2. delete the item from the UI
            uiCtrl.deleteListItem(itemID);

            // 3. Update and show new budget
            updateBudget();

            // 4. Calculate and update percs
            updatePercentages();
        }
    }

    return {
        init: function() {
            setupEventListeners();
            uiCtrl.displayBudget({
                budget: 0,
                percentage: -1,
                totalInc: 0,
                totalExp: 0
            });
            uiCtrl.displayDate();
        }
    }
})(budgetController, uiController);

controller.init();