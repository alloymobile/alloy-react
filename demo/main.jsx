import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import Cell from "./pages/Cell/Cell.jsx";           
import Tissue from "./pages/Tissue/Tissue.jsx";
import Organ from "./pages/Organ/Organ.jsx";
import IconPage from "./pages/Cell/Icon.jsx";  // NEW
import LinkPage from "./pages/Cell/Link.jsx";
import LinkIconPage from "./pages/Cell/LinkIcon.jsx";
import LinkLogoPage from "./pages/Cell/LinkLogo.jsx";
import ButtonPage from "./pages/Cell/Button.jsx";
import ButtonIconPage from "./pages/Cell/ButtonIcon.jsx";
import ButtonSubmitPage from "./pages/Cell/ButtonSubmit.jsx";
import InputPage from "./pages/Cell/Input.jsx";
import InputIconPage from "./pages/Cell/InputIcon.jsx";
import InputFloatingPage from "./pages/Cell/InputFloating.jsx";
import LinkBarPage from "./pages/Tissue/LinkBar.jsx";
import ButtonBarPage from "./pages/Tissue/ButtonBar.jsx";
import NavBarPage from "./pages/Tissue/NavBar.jsx";
import TablePage from "./pages/Tissue/Table.jsx";
import TableActionPage from "./pages/Tissue/TableAction.jsx";
import CardPage from "./pages/Tissue/Card.jsx";
import CardActionPage from "./pages/Tissue/CardAction.jsx";
import FormPage from "./pages/Tissue/Form.jsx";
import TabFormPage from "./pages/Tissue/TabForm.jsx";
import ModalPage from "./pages/Tissue/Modal.jsx";
import EmailPage from "./pages/Organ/Email.jsx";
import ContactPage from "./pages/Organ/Contact.jsx";
import ProfilePage from "./pages/Organ/Profile.jsx";
import PayPage from "./pages/Tissue/Pay.jsx";
import CheckoutPage from "./pages/Organ/Checkout.jsx";
import DonatePage from "./pages/Organ/Donate.jsx";
import GalleryPage from "./pages/Organ/Gallery.jsx";
import FooterPage from "./pages/Organ/Footer.jsx";
import SearchPage from "./pages/Cell/Search.jsx";
import HeroSignupPage from "./pages/Organ/HeroSignup.jsx";
import CrudFormPage from "./pages/Organ/CrudForm.jsx";
import PaginationPage from "./pages/Tissue/Pagination.jsx";
import CrudPage from "./pages/Organ/Crud.jsx";
import CarouselPage from "./pages/Tissue/Carousel.jsx";
import ImagePage from "./pages/Tissue/Image.jsx";
import VideoPage from "./pages/Tissue/Video.jsx";
import PostPage from "./pages/Organ/Post.jsx";
import LoadingPage from "./pages/Cell/Loading.jsx";
import MarqueePage from "./pages/Organ/Marquee.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<Navigate to="/cell" replace />} />

        {/* Cell routes */}
        <Route path="/cell" element={<Cell />}>
          <Route index element={<Navigate to="icon" replace />} />
          <Route path="icon" element={<IconPage />} />
          <Route path="link" element={<LinkPage />} />
          <Route path="link-icon" element={<LinkIconPage />} />
          <Route path="link-logo" element={<LinkLogoPage />} />
          <Route path="button" element={<ButtonPage />} />   
          <Route path="button-icon" element={<ButtonIconPage />} />   
          <Route path="button-submit" element={<ButtonSubmitPage />} /> 
          <Route path="input" element={<InputPage />} /> 
          <Route path="input-icon" element={<InputIconPage />} /> 
          <Route path="input-floating" element={<InputFloatingPage />} />         
          <Route path="search" element={<SearchPage />} />     
          <Route path="loading" element={<LoadingPage />} />           
        </Route>

        {/* Others (blank for now) */}
        <Route path="/tissue" element={<Tissue />}>
          <Route index element={<Navigate to="link-bar" replace />} />
          <Route path="link-bar" element={<LinkBarPage />} />
          <Route path="button-bar" element={<ButtonBarPage />} />
          <Route path="nav-bar" element={<NavBarPage />} />
          <Route path="table" element={<TablePage />} />
          <Route path="table-action" element={<TableActionPage />} />
          <Route path="card" element={<CardPage />} />     
          <Route path="card-action" element={<CardActionPage />} />              
          <Route path="form" element={<FormPage />} />  
          <Route path="tab-form" element={<TabFormPage />} />  
          <Route path="modal" element={<ModalPage />} />   
          <Route path="pay" element={<PayPage />} />   
          <Route path="carousel" element={<CarouselPage />} />   
          <Route path="video" element={<VideoPage />} />   
          <Route path="pagination" element={<PaginationPage />} />      
          <Route path="image" element={<ImagePage />} />            
        </Route>
        <Route path="/organ" element={<Organ />}> 
          <Route path="email" element={<EmailPage />} />   
          <Route path="contact" element={<ContactPage />} />   
          <Route path="profile" element={<ProfilePage />} />   
          <Route path="checkout" element={<CheckoutPage />} />   
          <Route path="donate" element={<DonatePage />} />  
          <Route path="gallery" element={<GalleryPage />} />    
          <Route path="footer" element={<FooterPage />} />   
          <Route path="hero-signup" element={<HeroSignupPage />} />    
          <Route path="crud-form" element={<CrudFormPage />} />   
          <Route path="crud" element={<CrudPage />} />                  
          <Route path="post" element={<PostPage />} />   
          <Route path="marquee" element={<MarqueePage />} />  
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
