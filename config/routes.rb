Siorbackend::Application.routes.draw do
  root to: 'static_pages#home'

  namespace :admin do
    root to: "panel#home"

    #angular partials
    match "/users.html", to: "panel#users", via: [:get]
    match "/statistics.html", to: "panel#statistics", via: [:get]
  end

  #disallow google robots from staging env
  get '/robots.txt' => RobotsTxt

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]


  resource :contact_messages, only: [:create]
  namespace :api do
    resource :user, only: [:update] # not REST-ful because game does not have reference to current user id
    resources :users, only: [:index, :destroy]
    resources :statistics, only: [:index, :create, :destroy]
    match "statistics/uniq_count", to: 'statistics#uniq_count', via: [:get]
  end
end
