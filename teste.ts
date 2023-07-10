import { Builder, By, Capabilities, Key, WebDriver, until } from 'selenium-webdriver';
import 'geckodriver';

async function main() {
  const capabilities = Capabilities.firefox();
  const driver: WebDriver = new Builder().withCapabilities(capabilities).build();

  try {
    // Setando o site que iremos utilizar de teste
    await driver.get('http://localhost:8080');

    // Teste Registro
    await register(driver);

    // Teste Login
    await login(driver);

    // Teste Depositar
    await inserirSaldo(driver);

    // Teste Criar Grupo
    await criarGrupo(driver);

    // Teste Enviar Mensgem Grupo
    await enviarMensagemGrupo(driver);

    // Teste Encerrar Grupo 
    await encerrarGrupo(driver);

  } finally {
    // Encerre o driver após a conclusão do script
    delay(25000);
    await driver.quit();
  }
}

main();

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function register(driver: WebDriver) {
  console.log('Iniciando o Cadastro');
  const campoRegister = await driver.findElement(By.xpath('/html/body/div/div/div[1]/form/div[1]/input'));
  const registerButton = await driver.findElement(By.xpath('/html/body/div/div/div[1]/form/button'));
  await campoRegister.sendKeys('paulop');
  await registerButton.click();
  console.log('Fim do Cadastro');
  await delay(1000);
  
}

async function login(driver: WebDriver) {
  console.log('Iniciando o Login');
  const campoLogin = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div[1]/input'));
  const campoSenha = await driver.findElement(By.xpath('//*[@id="floatingPassword"]'));
  const botaoLogin = await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/button'));

  await campoLogin.sendKeys('paulop');
  await campoSenha.sendKeys('123');
  await botaoLogin.click();
  console.log('Fim do Login');
  delay(1000);
  await driver.get('localhost:8080/home');
}

async function inserirSaldo(driver: WebDriver) {
  console.log('Iniciando Inserção de Saldo')
  await menuConfiguracoes(driver);

  const botaoCarteira = await driver.findElement(By.xpath('//*[@id="v-pills-carteira-tab"]'));
  const botaoDepositar = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div/div[2]/div[4]/div[1]/div/div[2]/div/div/button[1]'));
  const inputValor = await driver.findElement(By.xpath('/html/body/div[3]/div/div/form/div[1]/div/input[2]'));
  const botaoConfirmar = await driver.findElement(By.xpath('/html/body/div[3]/div/div/form/div[2]/button[2]'));
  await botaoCarteira.click();
  await botaoDepositar.click();
  await inputValor.sendKeys('30');
  await botaoConfirmar.click();
  await homeReturn(driver);

}

async function criarGrupo(driver: WebDriver) {
  console.log('Iniciando Criar Grupo');
  await homeReturn(driver);

  const botaoCriarGrupo = await driver.findElement(By.xpath('/html/body/div[3]/div/div[1]/button'));
  await botaoCriarGrupo.click();

  const preco = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[2]/form/div[1]/input'));
  const participantes = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[2]/form/div[2]/input'));
  const localPartida = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[2]/form/div[3]/input'));
  const localDestino = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[2]/form/div[4]/input'));
  const dataPartida = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[2]/form/div[5]/input'));
  const descricao = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[2]/form/div[6]/input'));
  const botaoConfirmar = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[2]/form/div[7]/button[2]'));
  await preco.sendKeys('5');
  await participantes.sendKeys('3');
  await localPartida.sendKeys('Centro Alcantara');
  await localDestino.sendKeys('UFF Praia Vermelha');
  await dataPartida.sendKeys('2023-11-25');
  await descricao.sendKeys('bora pra Uff');
  await botaoConfirmar.click();
  delay(5000);

  await homeReturn(driver);
  console.log('Finalizando Criar Grupo');
}

async function encerrarGrupo(driver: WebDriver) {
  console.log('Iniciando Encerrar Grupo');
  await homeReturn(driver);

  const botaoViagem = await driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div/div[4]/div[2]/a/button'));
  await botaoViagem.click();

  delay(9000);
  const finalizarBotao = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[1]/div/div[4]/a[2]'));
  await finalizarBotao.click();
  console.log('Finalizando Encerrar Grupo');

}

async function enviarMensagemGrupo(driver: WebDriver) {
  console.log('Iniciando Mensagem Grupo');
  await homeReturn(driver);

  const botaoViagem = await driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div/div/div[4]/div[2]/a/button'));
  await botaoViagem.click();
  const botaoMensagem = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[1]/div/div[4]/button[2]'));
  await botaoMensagem.click();
  const campoMensageem = await driver.findElement(By.xpath('/html/body/div[4]/div[2]/div/form/div/input[1]'));
  await campoMensageem.sendKeys('Fechando grupo pessoal', Key.ENTER);
  console.log('Encerrando Mensagem Grupo');

}

async function menuConfiguracoes(driver: WebDriver) {
  const botaoMenu = await driver.findElement(By.xpath('//*[@id="navbarDropdown"]'));
  const botaoConfig = await driver.findElement(By.xpath('/html/body/div[1]/div/nav/div[2]/div/ul/li[1]/ul/li[6]/a'));
  await botaoMenu.click();
  await botaoConfig.click();
}

async function homeReturn(driver: WebDriver) {
  await driver.get('localhost:8080/home');
  const home = driver.findElement(By.xpath('/html/body/div[1]/div/nav/div[1]/ul/li[1]/a'));
  await home.click();
}