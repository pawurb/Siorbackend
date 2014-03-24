Siorbackend::Application.routes.draw do
  root to: 'static_pages#home'

  namespace :admin do
    root to: "panel#home"
  end


  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

  resource :user, only: [:update]
  resource :contact_messages, only: [:create]
  resources :statistics, only: [:create]
end
