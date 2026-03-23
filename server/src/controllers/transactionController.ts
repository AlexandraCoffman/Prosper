import Transaction from '../models/Transaction.model.js'
export const getTransactions = async (req, res) => {
  try {
    const notes = await Transaction.findById(id, req.body);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
