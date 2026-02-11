
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

class Product {
    private String name;
    private double price;
    private String category;

    public Product(String name, double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public String getName() {
        return this.name;
    }

    public double getPrice() {
        return this.price;
    }

    public String getCategory() {
        return this.category;
    }
}

public class FilterExample {

    public static List<Product> applyFilter(List<Product> products, Predicate<Product> filter) {
        List<Product> result = new ArrayList<>();
        for (Product product : products) {
            if (filter.test(product)) {
                result.add(product);
            }
        }
        return result;

    }

    public static void main(String args[]) {
        List<Product> products = List.of(
                new Product("Laptop", 980, "Electronics"),
                new Product("Mouse", 25.50, "Electronics"),
                new Product("Desk", 199.99, "Furniture"),
                new Product("Chair", 89.99, "Furniture"));
        System.out.println(products);

        Predicate<Product> affordableFilter = p -> p.getPrice() < 100;
        List<Product> affordable = applyFilter(products, affordableFilter);
        for (int i = 0; i < affordable.size(); i++) {
            System.out.println(affordable.get(i).getName());
        }

        Predicate<Product> electronicsFilter = p -> p.getCategory().equals("Electronics");
        List<Product> electronics = applyFilter(products, electronicsFilter);
        System.out.println(electronics);

        Predicate<Product> combined = affordableFilter.and(electronicsFilter);
        List<Product> affordableElectronics = applyFilter(products, combined);
        System.out.println(affordableElectronics);

        ProductFilter filter = new ProductFilter()
                .priceRange(20, 100)
                .category("Electronics");

        List<Product> filtered = filter.apply(products);
        for (int i = 0; i < filtered.size(); i++) {
            System.out.println(filtered.get(i).getName());
        }
    }
}
