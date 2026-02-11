
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class ProductFilter {
    private List<Predicate<Product>> predicates = new ArrayList<>();

    public ProductFilter priceRange(double min, double max) {
        predicates.add(p -> p.getPrice() >= min && p.getPrice() <= max);
        return this;
    }

    public ProductFilter category(String category) {
        predicates.add(p -> p.getCategory().equals(category));
        return this;
    }

    public ProductFilter nameContains(String keyword) {
        predicates.add(p -> p.getName().toLowerCase().contains(keyword.toLowerCase()));
        return this;
    }

    public Predicate<Product> build() {
        return predicates.stream().reduce(Predicate::and).orElse(p -> true);
    }

    public List<Product> apply(List<Product> products) {
        Predicate<Product> combinedFilter = build();
        return products.stream().filter(combinedFilter).collect(Collectors.toList());
    }
}
/*
 * !imp--->
 * create a list of predicates and then bind it together to create one predicate
 * and then pass it to the filter method to check for each product to keep them
 * or not and then collect all the items to a list...
 */
