const API_URL = "http://10.31.35.27:3000";

export async function listarReservasEquipamentos() {
    const response = await fetch(
        `${API_URL}/reservas/equipamentos/api`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar reservas");
    }

    return await response.json();
}

export async function fazerLogin(Login, Senha) {
    const response = await fetch(
        `${API_URL}/auth/api/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                Login,
                Senha
            })
        }
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(dados.erro || "Erro ao fazer login");
    }

    return dados;
}

export async function fazerCadastro(Login, Senha) {
    const response = await fetch(
        `${API_URL}/auth/api/cadastro`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                Login,
                Senha
            })
        }
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.erro || "Erro ao realizar cadastro"
        );
    }

    return dados;
}