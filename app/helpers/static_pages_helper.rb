module StaticPagesHelper
  def nickname_class player
    if player == current_user
      'bold'
    else
      ''
    end
  end
end
