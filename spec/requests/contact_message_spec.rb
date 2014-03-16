require 'spec_helper'

describe "Sending contact message" do
  it "sends message to Siorbsupport" do
    visit "/"
    expect(page).to have_content "Uważam że"
    click_link

  end
end