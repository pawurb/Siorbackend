module SerializerDateFormatter
  def date
    object.created_at.strftime("%e-%m-%y %H:%M")
  end
end