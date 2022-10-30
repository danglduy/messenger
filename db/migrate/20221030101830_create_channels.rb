class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false, default: ''
      t.integer :channel_type, null: false, default: 0

      t.timestamps
    end
  end
end
