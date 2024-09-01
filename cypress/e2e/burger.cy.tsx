const bun = '[data-cy=643d69a5c3f7b9001cfa093d]';
const main = '[data-cy=643d69a5c3f7b9001cfa093e]';
const salad = '[data-cy=643d69a5c3f7b9001cfa0949]';
const sauce = '[data-cy=643d69a5c3f7b9001cfa0944]';

describe('тест добавления ингредиентов', () => {
    before(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
        cy.visit('/');
    });
    it('ингредиенты корректно добавляются в конструкто', () => {
        cy.get(bun).contains('Добавить').click();
        cy.get(main).contains('Добавить').click();
        cy.get(salad).contains('Добавить').click();
        cy.get(sauce).contains('Добавить').click();
    });
});

describe('тест работы модальных окон', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
        cy.visit('/');
    });
    it('модальное окно корректно открывается', () => {
        cy.get(bun).click();
    });
    it('модальное окно корректно закрывается по клику', () => {
        cy.get(bun).click();
        cy.get(`[data-cy='modal-close-button']`).click();
    });
    it('модальное окно корректно закрывается по нажатию Esc', () => {
        cy.get(bun).click();
        cy.get(`[data-cy='modal-overlay']`).click({ force: true });
        cy.get('#modals').should('not.be.visible');
    });
});

describe('тест создания заказа', () => {
    before(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
        cy.setCookie('accessToken', 'testAccessToken');
        window.localStorage.setItem('refreshToken', 'testRefreshToken');
        cy.visit('/');
    });
    after(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    it('ингредиенты корректно добавляются в конструкто', () => {
        cy.get(bun).contains('Добавить').click();
        cy.get(main).contains('Добавить').click();
        cy.get(salad).contains('Добавить').click();
        cy.get(sauce).contains('Добавить').click();
        cy.get('button').contains('Оформить заказ').click();
        cy.get(`[data-cy='order-number']`).should('contain.text', '51678');
        cy.get(`[data-cy='modal-close-button']`).click();
        cy.get(`[data-cy^='no-buns']`).contains('Выберите булки');
        cy.get(`[data-cy='no-buns-ingredients']`).contains('Выберите начинку');
    });
});