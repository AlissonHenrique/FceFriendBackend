const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const AdFriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  cpf: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  user_name: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: "Aguardando"
  },
  voucher: {
    type: String,
    default: "Aguardando pagamento"
  },
  dataVencimento: {
    type: Date,
    required: false
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

AdFriendSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Ad", AdFriendSchema);
