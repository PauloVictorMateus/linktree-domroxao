import  { useState } from 'react';
import './Menu.css'; 
import { menuItems, acaiOptions } from '../../data/menu';


interface CustomAcai {
  size?: typeof acaiOptions.sizes[0];
  fruits: typeof acaiOptions.fruits[0][];
  toppings: typeof acaiOptions.toppings[0][];
  extras: typeof acaiOptions.extras[0][];
}

interface OrderDetails {
  paymentMethod: string;
  address: string;
  complement?: string;
}

function Menu() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [customAcai, setCustomAcai] = useState<CustomAcai>({
    size: undefined,
    fruits: [],
    toppings: [],
    extras: []
  });
  const [orderType, setOrderType] = useState<'custom' | 'ready' | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    paymentMethod: '',
    address: '',
    complement: ''
  });

  const toggleItem = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const sendOrder = () => {
    setShowOrderForm(true);
  };

  const selectSize = (size: typeof acaiOptions.sizes[0]) => {
    setCustomAcai(prev => ({ ...prev, size }));
  };

  const toggleOption = (
    item: typeof acaiOptions.fruits[0] | typeof acaiOptions.toppings[0] | typeof acaiOptions.extras[0],
    category: 'fruits' | 'toppings' | 'extras'
  ) => {
    setCustomAcai(prev => {
      const currentItems = prev[category];
      const exists = currentItems.find(i => i.id === item.id);
      
      if (exists) {
        return {
          ...prev,
          [category]: currentItems.filter(i => i.id !== item.id)
        };
      } else {
        // Limitar frutas a 3 escolhas
        if (category === 'fruits' && currentItems.length >= 3) {
          return prev;
        }
        return {
          ...prev,
          [category]: [...currentItems, item]
        };
      }
    });
  };

  const calculateTotal = () => {
    const sizePrice = customAcai.size ? parseFloat(customAcai.size.price.replace('R$ ', '').replace(',', '.')) : 0;
    const fruitsPrice = customAcai.fruits.reduce((acc, fruit) => 
      acc + parseFloat(fruit.price.replace('R$ ', '').replace(',', '.')), 0);
    const toppingsPrice = customAcai.toppings.reduce((acc, topping) => 
      acc + parseFloat(topping.price.replace('R$ ', '').replace(',', '.')), 0);
    const extrasPrice = customAcai.extras.reduce((acc, extra) => 
      acc + parseFloat(extra.price.replace('R$ ', '').replace(',', '.')), 0);
    
    return (sizePrice + fruitsPrice + toppingsPrice + extrasPrice).toFixed(2);
  };

  const sendCustomAcaiOrder = () => {
    if (!customAcai.size) return;
    setShowOrderForm(true);
  };

  const submitCompleteOrder = () => {
    let orderText = '';

    if (orderType === 'ready') {
      const items = selectedItems
        .map(id => {
          const item = menuItems.find(item => item.id === id);
          return `${item?.name} - ${item?.price}`;
        })
        .join('\n');
      
      orderText = `Olá! Vim pelo site da Dom Roxão e gostaria de pedir:\n${items}\n\n`;
    } else {
      orderText = `Olá! Vim pelo site da Dom Roxão e gostaria de pedir um Açaí Personalizado:
- Tamanho: ${customAcai.size?.name}
- Frutas: ${customAcai.fruits.map(f => f.name).join(', ')}
- Toppings: ${customAcai.toppings.map(t => t.name).join(', ')}
- Extras: ${customAcai.extras.map(e => e.name).join(', ')}
Total: R$ ${calculateTotal()}\n\n`;
    }

    orderText += `Forma de Pagamento: ${orderDetails.paymentMethod}
Endereço: ${orderDetails.address}
${orderDetails.complement ? `Complemento: ${orderDetails.complement}` : ''}`;

    const whatsappLink = `https://api.whatsapp.com/send?phone=5585992680560&text=${encodeURIComponent(orderText)}`;
    window.open(whatsappLink, '_blank');
    setShowOrderForm(false);
  };

  const renderOrderTypeSelection = () => {
    return (
      <div className="order-type-selection">
        <h2>Escolha como deseja seu açaí</h2>
        <div className="order-type-buttons">
          <button 
            className={orderType === 'ready' ? 'selected' : ''} 
            onClick={() => setOrderType('ready')}
          >
            Açaís Prontos
          </button>
          <button 
            className={orderType === 'custom' ? 'selected' : ''} 
            onClick={() => setOrderType('custom')}
          >
            Montar Meu Açaí
          </button>
        </div>
      </div>
    );
  };

  const renderReadyAcais = () => {
    return (
      <div className="ready-acais-section">
        <h2>Açaís Prontos</h2>
        <div className="options-grid">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`menu-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </div>
          ))}
        </div>
        {selectedItems.length > 0 && (
          <button onClick={sendOrder} className="order-button">
            Finalizar Pedido
          </button>
        )}
      </div>
    );
  };

  const renderOrderForm = () => {
    return (
      <div className="order-form-overlay">
        <div className="order-form">
          <h3>Finalizar Pedido</h3>
          
          <div className="form-group">
            <label>Forma de Pagamento:</label>
            <select
              value={orderDetails.paymentMethod}
              onChange={(e) => setOrderDetails({
                ...orderDetails,
                paymentMethod: e.target.value
              })}
              required
            >
              <option value="">Selecione...</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="PIX">PIX</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
            </select>
          </div>

          <div className="form-group">
            <label>Endereço de Entrega:</label>
            <input
              type="text"
              value={orderDetails.address}
              onChange={(e) => setOrderDetails({
                ...orderDetails,
                address: e.target.value
              })}
              placeholder="Rua, número, bairro"
              required
            />
          </div>

          <div className="form-group">
            <label>Complemento (opcional):</label>
            <input
              type="text"
              value={orderDetails.complement}
              onChange={(e) => setOrderDetails({
                ...orderDetails,
                complement: e.target.value
              })}
              placeholder="Apartamento, ponto de referência, etc."
            />
          </div>

          <div className="form-buttons">
            <button 
              onClick={() => setShowOrderForm(false)}
              className="cancel-button"
            >
              Cancelar
            </button>
            <button
              onClick={submitCompleteOrder}
              className="submit-button"
              disabled={!orderDetails.paymentMethod || !orderDetails.address}
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="menu-container">
      <h1>Vamos a montagem do seu Açai</h1>
      
      {renderOrderTypeSelection()}

      {orderType === 'ready' && renderReadyAcais()}
      
      {orderType === 'custom' && (
        <div className="custom-acai-section">
          <h3>1. Escolha o Tamanho</h3>
          <div className="options-grid">
            {acaiOptions.sizes.map(size => (
              <div 
                key={size.id} 
                className={`option-item ${customAcai.size?.id === size.id ? 'selected' : ''}`}
                onClick={() => selectSize(size)}
              >
                <span>{size.name}</span>
                <span>{size.price}</span>
              </div>
            ))}
          </div>

          <h3>2. Escolha até 3 Frutas</h3>
          <div className="options-grid">
            {acaiOptions.fruits.map(fruit => (
              <div 
                key={fruit.id} 
                className={`option-item ${customAcai.fruits.some(f => f.id === fruit.id) ? 'selected' : ''}`}
                onClick={() => toggleOption(fruit, 'fruits')}
              >
                <span>{fruit.name}</span>
                <span>{fruit.price}</span>
              </div>
            ))}
          </div>

          <h3>3. Escolha os Toppings</h3>
          <div className="options-grid">
            {acaiOptions.toppings.map(topping => (
              <div 
                key={topping.id} 
                className={`option-item ${customAcai.toppings.some(t => t.id === topping.id) ? 'selected' : ''}`}
                onClick={() => toggleOption(topping, 'toppings')}
              >
                <span>{topping.name}</span>
                <span>{topping.price}</span>
              </div>
            ))}
          </div>

          <h3>4. Escolha os Extras</h3>
          <div className="options-grid">
            {acaiOptions.extras.map(extra => (
              <div 
                key={extra.id} 
                className={`option-item ${customAcai.extras.some(e => e.id === extra.id) ? 'selected' : ''}`}
                onClick={() => toggleOption(extra, 'extras')}
              >
                <span>{extra.name}</span>
                <span>{extra.price}</span>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3>Total: R$ {calculateTotal()}</h3>
            <button 
              onClick={sendCustomAcaiOrder} 
              disabled={!customAcai.size}
            >
              Pedir Açaí Personalizado
            </button>
          </div>
        </div>
      )}
      {showOrderForm && renderOrderForm()}
    </div>
  );
}

export default Menu;
