import React from 'react'
import styles from './styles'

import rotulo from '../../../assets/rotulo.png'

const About: React.FC = () => {
  return <styles.main>
    <h1>Termos de uso do RisQLAC</h1>
    <p>
      RisQLAC é uma sigla criada para denominar o programa (software)
      Risco Químico em Laboratórios de Análises Clínicas, um produto
      tecnológico resultante da dissertação de mestrado em Análises Clínicas,
      da discente Erlayne Silvana Santiago Cavalcante, da Universidade Federal
      do Pará. O RisQLAC é um banco de dados direcionado ao armazenamento de
      informações acerca de produtos químicos perigosos, utilizados por profissionais
      e alunos de laboratórios da UFPA. É uma tecnologia educacional que visa o
      gerenciamento de risco químico por meio do Sistema Globalmente Harmonizado
      de Classificação e Rotulagem de Produtos Químicos (GHS).
    </p>
    <p>
      A utilização do software RisQLAC inicia-se com o cadastro do usuário, que
      pode ser em duas categorias: aluno e técnico/docente. Nome, email, senha e
      laboratório vinculado são requisitos obrigatórios para entrar no sistema,
      objetivando garantir a rastreabilidade de informações. Aos(as) técnicos(as)
      e docentes são asseguradas a inserção e a edição de informações no banco de
      dados, já os alunos(as) podem apenas consultá-las. As informações lançadas
      no RisQLAC devem ser provenientes do rótulo do GHS e/ou da FISPQ do produto
      a ser cadastrado.
    </p>
    <p>
      Usuário: é a pessoa que acessa o domínio app.risqlac.com para consulta de
      informações ou para inclusão de dados na plataforma, mediante cadastro.
    </p>
    <p>
      Serviço: é qualquer funcionalidade do software RisQLAC ofertada ao usuário.
    </p>
    <p>
      Ler e aceitar os termos de uso são indispensáveis e precedem o cadastro do
      usuário na plataforma. Para a finalização do cadastro, o usuário deve preencher
      todos os campos obrigatórios e manter sigilo sobre a senha criada por si,
      visto que o usuário assume a responsabilidade pelas atividades realizadas
      por meio dela. Os usuários respondem pela veracidade das informações que
      cadastrarem na plataforma.
    </p>
    <p>
      O software RisQLAC coleta alguns dados pessoais dos usuários durante o
      cadastro para garantir a rastreabilidade. Esses dados nunca serão comercializados
      e a plataforma fará o possível para manter a confidencialidade e a segurança
      das informações dos usuários.
    </p>

    <h1>Quem somos</h1>
    <p>
      Idealizadora e responsável pelo conteúdo: Erlayne Silvana Santiago Cavalcante,
      biomédica, especialista em Gestão e Controle de Qualidade Laboratorial/UFPA.
    </p>
    <p>
      Desenvolvedor do programa: Fernando Paiva, engenheiro da computação.
    </p>

    <h1>Contato</h1>
    <p>
      erlayne.cavalcante@ufpa.br
      fernandopaivaec@gmail.com
    </p>

    <h1>Licença de uso</h1>
    <p>CC BY NC SA 4.0 Creative Commons</p>

    <h1>Sobre o GHS</h1>
    <p>
      O Sistema Global de Harmonização de Classificação e Rotulagem de Produtos
      Químicos (GHS) é um conjunto de critérios harmonizados desenvolvido pelas
      Nações Unidas (ONU), objetivando proteger a saúde das pessoas, o meio ambiente,
      além de facilitar o comércio de produtos químicos no mundo. É uma ferramenta
      de gestão que existe desde 2003 e está implantado em vários países. Desde
      2015, por meio da Portaria nº 229 do Ministério do Trabalho e Emprego, os
      fornecedores de produtos químicos no Brasil são obrigados a aplicar a
      classificação e a rotulagem de substâncias e misturas de forma harmonizada,
      bem como disponibilizar a Ficha de Informação de Segurança de Produto
      Químico (FISPQ) do produto químico perigoso fabricado ou importado.
    </p>
    <p>
      O GHS classifica as substâncias químicas e as misturas de acordo com os
      perigos físicos, à saúde e ao meio ambiente. As 9 classes de perigo são:
      inflamáveis, oxidantes, corrosivos, tóxicos, irritantes, gases sob pressão,
      explosivos, perigos à saúde e perigo ambiental. Sendo assim, na descrição
      do rótulo de um produto químico perigoso devem estar presentes identificação
      e composição, pictograma de perigo, palavra de advertência, frase de perigo,
      frase de precaução e informações suplementares, segundo a legislação brasileira.
    </p>
    <p>Exemplo de um rótulo</p>
    <img src={rotulo}>
    </img>

    <h1>As classes do GHS</h1>
    <ul>
      <li>Inflamável: engloba as substâncias químicas que entram em ignição sob uma fonte de calor. Seu símbolo representativo é uma chama. Os produtos químicos inflamáveis são bastante comuns em laboratórios clínicos. Exemplos: álcool etílico e álcool metílico.</li>

      <li>Oxidante: classe representada por uma chama sobre um círculo. Uma substância oxidante é instável por facilmente liberar oxigênio, o que pode intensificar um incêndio quando em contato com um produto inflamável.</li>

      <li>Explosiva: reúne aqueles agentes químicos, como substâncias ou misturas auto-reativas e alguns peróxidos orgânicos, capazes de iniciar um processo destrutivo por meio de uma intensa liberação de energia. É a classe representada por uma bomba explodindo.</li>

      <li>Gás sob pressão: classe que contêm os gases que podem explodir em contato com o calor: gás comprimido, gás liquefeito, gás liquefeito refrigerado e gás dissolvido.</li>

      <li>Irritante: o ponto de exclamação alerta para a presença de substância ou mistura irritante. Ele indica perigo de irritação na pele, dano ocular ou toxicidade a determinados órgãos, o que pode ocorrer por inalação ou absorção do agente químico pertencente a esta classe.</li>

      <li>Perigo à saúde: o símbolo desta classe revela perigos de mutagenicidade, carcinogenicidade e toxicidade reprodutiva, agravos que podem despontar a partir da aspiração do produto químico, detentor de tal símbolo, após exposição única ou repetida a ele.</li>

      <li>Tóxico: as substâncias ou misturas altamente tóxicas por inalação, ingestão ou absorção pela pele, as quais provocam danos gravíssimos à saúde ou morte, devem exibir o símbolo contendo uma caveira e ossos cruzados. Exemplo: clorofórmio.</li>

      <li>Corrosivo: nesta classe estão os produtos químicos com potencial para destruir tecidos vivos e materiais inertes. Alguns exemplos: ácido acético, ácido sulfúrico, hipoclorito de sódio e hidróxido de sódio.</li>

      <li>Perigo ao meio ambiente: as substâncias ou misturas que acarretam malefícios aos organismos aquáticos carregam a simbologia representante desta classe.</li>
    </ul>

    COLOCAR OS PICTOGRAMAS CORRESPONDENTES
  </styles.main>
}

export default About
