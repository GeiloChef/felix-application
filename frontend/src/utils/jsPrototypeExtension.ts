Object.defineProperty( String.prototype, 'capitalizeFirstLetter', {
  value: function()
  {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
});