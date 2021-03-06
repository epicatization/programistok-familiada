Rails.application.routes.draw do
  get 'admin/index'

  resources :questions, only: [:index, :show]
  resource :game, only: [] do
    get :custom_notification
    get :hide_intro
    get :show_suprise
    get :change_name
    get :show_question_title
    get :assign_score
    get :show_all_answers
  end
  resources :answers, only: [] do
    get :valid, on: :member
    get :invalid, on: :collection
  end
  mount ActionCable.server => '/cable'
end
