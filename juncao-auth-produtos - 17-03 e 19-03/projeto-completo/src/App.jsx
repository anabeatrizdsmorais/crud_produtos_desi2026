import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './page/Login'
import Home from './page/Home'
import CadastrarUsuario from './page/CadastrarUsuario'
import CadastrarProduto from './page/CadastrarProduto'
import ListarProduto from './page/ListarProduto'
import ListarUsuario from './page/ListarUsuario'
import Error from './page/Error'
import EsqueciSenha from './page/EsqueciSenha'
import Layout from "./components/Layout";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
          				<Route index element={<Home />} />
						<Route path="/home" element={<Home/>} ></Route>
						<Route path="/usuario/cadastro" element={<CadastrarUsuario/>} ></Route>
						<Route path="/produto/cadastro" element={<CadastrarProduto/>} ></Route>
						<Route path="/produto" element={<ListarProduto/>} ></Route>
						<Route path="/usuario" element={<ListarUsuario/>} ></Route>
					</Route>
										
					<Route path="/login" element={<Login/>} ></Route>
					<Route path="/esqueci_senha" element={<EsqueciSenha/>} ></Route>

					<Route path="*" element={<Error/>} ></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App;
