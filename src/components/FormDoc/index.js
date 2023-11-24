import { useEffect, useState } from "react";
import axios from "axios";
import "./figmaStyles.css";
import { SiSelenium } from "react-icons/si";
import autoItLogo from "../../assets/autoit.svg"
import { MdHttp } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { api } from "../../services/api";

export const FormDoc = () => {
  const [empresa, setEmpresa] = useState('');
  const [sistemas, setSistemas] = useState('');
  const [bibliotecaAutoIT, setBibliotecaAutoIT] = useState('');
  const [bibliotecaSelenium, setBibliotecaSelenium] = useState('');
  const [autor, setAutor] = useState('');
  const [emailAutor, setEmailAutor] = useState('');
  const [tipoAutomacao, setTipoAutomacao] = useState('');
  const [biblioteca, setBiblioteca] = useState("");

  const handleAutoITChange = () => {
    setBibliotecaAutoIT(!bibliotecaAutoIT)
  };

  const handleSeleniumChange = () => {
    setBibliotecaSelenium(!bibliotecaSelenium)
  };

  const handleBibliotecas = () =>{
    if (bibliotecaAutoIT && bibliotecaSelenium) {
      setBiblioteca("3");
    } else if (!bibliotecaAutoIT && !bibliotecaSelenium) {
      setBiblioteca("");
    } else {
      // Se apenas um deles estiver ativo, atualize para o valor correspondente
      setBiblioteca(bibliotecaAutoIT ? "1" : "2");
    }
  }
  useEffect(() => {
    handleBibliotecas();
  }, [bibliotecaAutoIT, bibliotecaSelenium]);

  const handleRadioChange = (event) => {
    setTipoAutomacao(event.target.value);
  };

  const fazerDownload = async (formData) => {
    try {
      let endpoint;

      if (tipoAutomacao === "1") {
        endpoint = "/cria_documento/login";
      } else if (tipoAutomacao === "2") {
        endpoint = "/cria_documento/abre_site";
      }

      const response = await api.post(endpoint, formData, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], {
        type: 'application/zip', // Use 'application/zip' para tratar ambos os documentos como um arquivo zip
      });

      const zipUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = 'documentosPDD_SDD.zip'; // Nome do arquivo zip
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Limpar o URL criado após o download
      URL.revokeObjectURL(zipUrl);
    }
     catch (error) {
      console.error("Erro ao fazer o download:", error);
      // Adicione lógica para lidar com erros (por exemplo, mostrar uma mensagem de erro)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      sistemas,
      empresa,
      autor,
      emailAutor,
      biblioteca
    };

    if (!bibliotecaAutoIT && !bibliotecaSelenium) {
      alert('Selecione pelo menos uma opção de biblioteca!');
      return;
    }

    if (tipoAutomacao === "") {
      alert('Selecione o tipo de robô usado!');
      return;
    }

    console.log(formData)
    fazerDownload(formData)
    
  };

  return (
    <div className="form-container">
      <form id="formCriaDoc" onSubmit={handleSubmit}>
        <label className="tologado">Tô Logado</label>

        <div className="textInput">
          <input className="inputSistemas" type="text" value={sistemas} onChange={(e) => setSistemas(e.target.value)} placeholder="Sistemas" required/>
          <input className="inputEmpresa" type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Empresa" required/>
          <input className="inputAutor" type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor" required/>
          <input className="inputEmail" type="text" value={emailAutor} onChange={(e) => setEmailAutor(e.target.value)} placeholder="Email" required/>
        </div>
        
        <div className="botoes">

          <div className="bibliotecas">
           
            <input id="bib1" type="checkbox" value="1" name="inputAutoIT" checked={bibliotecaAutoIT} onChange={handleAutoITChange} ></input>
            <label className="checkbox-alias" htmlFor="bib1">
            <img src={autoItLogo} alt="autoItLogo" className="logoAuto" />
            </label>

            <input id="bib2" type="checkbox" value="2" name="inputSelenium" checked={bibliotecaSelenium} onChange={handleSeleniumChange} ></input>
            <label className="checkbox-alias" htmlFor="bib2">
            <SiSelenium className="logoSel"/>
            </label>

          </div>

          <div className="tipo-auto">

            <input id="tipo1" type="radio" value="1" name="inputTipo" checked={tipoAutomacao === "1"} onChange={handleRadioChange} ></input>
            <label className="radio-alias" htmlFor="tipo1">
            <VscAccount className="logoLog"/>
            </label>

            <input id="tipo2" type="radio" value="2" name="inputTipo" checked={tipoAutomacao === "2"} onChange={handleRadioChange} ></input>
            <label className="radio-alias" htmlFor="tipo2">
            <MdHttp className="logoSis"/>
            </label>

          </div>
        
        </div>

          <label className="labelDownload" htmlFor="botaoDown">
            <button id="botaoDown" className="botaoDownload" type="submit">
            Download
            </button>
          </label>

      </form>
    </div>
  );
};
export default FormDoc;