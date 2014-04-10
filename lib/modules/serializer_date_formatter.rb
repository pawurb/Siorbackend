module SerializerDateFormatter
  def created_at_txt
    object.created_at.strftime("%e-%m-%y %H:%M")
  end

  def created_at_unix
    object.created_at.to_i
  end

  def updated_at_txt
    object.updated_at.strftime("%e-%m-%y %H:%M")
  end

  def updated_at_unix
    object.updated_at.to_i
  end
end