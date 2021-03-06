import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import LogoImg from "../../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";

export default function OngProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const ongId = localStorage.getItem("ongId");

  useEffect(() => {
    api.get(`/ongs/${ongId}`).then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setWhatsapp(response.data.whatsapp);
      setCity(response.data.city);
      setUf(response.data.uf);
    });
  }, [ongId]);

  async function handleUpdate(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      await api.put("/ongs", data, {
        headers: {
          Authorization: ongId
        }
      });

      localStorage.setItem("ongName", name);
      alert("Informações atualizadas com sucesso.");
    } catch (err) {
      alert("Erro no cadastro. Tente novamente");
    }
  }

  return (
    <div className="ong-profile-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />

          <h1>Alterar informações de contato</h1>
          <p>
            Mantenha seus dados atualizados para que os heróis te encontrem!
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para lista de casos
          </Link>
        </section>

        <form onSubmit={handleUpdate}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InputMask
            mask="(99)99999-9999"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              maxLength={2}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
