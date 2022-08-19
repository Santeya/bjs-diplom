const logoutButton = new LogoutButton();

logoutButton.action = () => {   
    ApiConnector.logout (result => {
        if (result.success) {
            location.reload();
        } 
    })
}

ApiConnector.current (result => {
    if (result.success) {
        ProfileWidget.showProfile(result.data);
    } 
})

const ratesBoard = new RatesBoard();

ratesBoard.currentStocks = () => {
    ApiConnector.getStocks(result => {
        if (result.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    });
}
ratesBoard.currentStocks();
setInterval(ratesBoard.currentStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(true, 'Баланс пополнен');
        } else {
            moneyManager.setMessage(false, result.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(true, 'Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(false, result.error);
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(true, 'Перевод средств прошел успешно');
        } else {
            moneyManager.setMessage(false, result.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites (result => {
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);           
        }
        
    })

favoritesWidget.addUserCallback = (userData) => {
    ApiConnector.addUserToFavorites(userData, (result) => {
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            moneyManager.setMessage(true, 'Пользователь добавлен');
        } else {
            moneyManager.setMessage(false, result.error);
        }
    });
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (result) => {
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            moneyManager.setMessage(true, 'Пользователь удален');
        } else {
            moneyManager.setMessage(false, result.error);
        }
    });
}
