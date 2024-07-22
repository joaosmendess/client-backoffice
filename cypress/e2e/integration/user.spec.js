/// <reference types="cypress" />

describe('Gerenciamento de Usuários', () => {
  const userName = `backendFraco`;
  const userEmail = `${userName}@example.com`;

  before(() => {
    const redirectTo = 'http://localhost:5173/callback';
    cy.login('joao.mendes', 'password123', redirectTo);
  });

  // Aqui ele deve clicar no ícone de menu, abrir o drawer e ir para a rota de gerenciar usuário
  it('deve criar um novo usuário', () => {
    // Navega para o dashboard
    cy.visit('/');
    
    // Clica no ícone do menu para abrir o drawer
    cy.get('button[aria-label="menu"]').click();
    
    // Clica no menu de usuário para expandir as opções
    cy.get('#user-menu').click();
    
    // Clica na opção 'Gerenciar usuário'
    cy.get('#manage-user-menu').click();
    
    // Verifica se está na rota correta
    cy.url().should('include', '/gerenciar-usuario');
    
    // Preenche o formulário de criação de usuário
    cy.get('#name').type(userName);
    cy.get('#userName').type(userName);
    cy.get('#email').type(userEmail);
    cy.get('#permissionGroupId').click();
    cy.get('li[data-value="1"]').click();
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de sucesso foi exibida
    cy.contains('Usuário criado com sucesso!').should('be.visible');
  });

  
  
  // Aqui ele deve clicar no ícone de menu e ir para a rota de listar usuários
  it('deve editar o usuário criado', () => {
    cy.visit('/dashboard');
   

    // Clica no ícone do menu para abrir o drawer
    cy.get('button[aria-label="menu"]').click();
    
    // Clica no menu de usuário para expandir as opções
    cy.get('#user-menu').click();
    
    // Clica na opção 'Listar usuários'
    cy.get('#list-user-menu').click();
    
    // Verifica se está na rota correta
    cy.url().should('include', '/listar-usuarios');

    // Filtra o usuário criado
    cy.get('#search').type(userName);
    cy.contains(userName).should('be.visible');

    // Abre o menu de ações e clica em "Editar"
    cy.get(`#menu-tabela`).click();
    cy.contains('Editar').click();

    // Edita as informações do usuário
    cy.get('#name').clear();
    cy.get('#name').type(`${userName} Editado`);
    
    cy.get('#userName').clear();
    cy.get('#userName').type(`editado-${userEmail}`);

    // Salva as alterações
    cy.get('#salvar-usuario').contains('Salvar').click();
    


    // Verifica se a mensagem de sucesso foi exibida
    cy.contains('Usuário atualizado com sucesso!').should('be.visible');

    // Verifica se as alterações foram salvas
   
  });
});
