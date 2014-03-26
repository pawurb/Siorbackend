Siorbackend::Application.routes.draw do
  root to: 'static_pages#home'

  namespace :admin do
    root to: "panel#home"

    #angular partials
    match "/users.html", to: "panel#users", via: [:get]
    match "/statistics.html", to: "panel#statistics", via: [:get]
  end


  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

  resource :user, only: [:update]
  resources :users, only: [:index, :destroy]

  resource :contact_messages, only: [:create]
  resources :statistics, only: [:index, :create, :destroy]
end
